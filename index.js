const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const axios = require("axios")
const connectLocaldb = require("./db/connectLocalDB")
const { createSchedule } = require("./common/createSchedule")
const { checkAlpha, checkPassWord, checkEmail, commonResponse } = require("./common/common")
const { invalidInputMessage } = require("./common/message")
const { hashPassword, comparePassword, decodeJwtToken, encodeJwtToken } = require("./common/secureData")


const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


let serverPort = process.env.PORT || 3001

app.listen(serverPort, () => {
    console.log("hello 3001");
})

app.get("/", (req, res) => {
    res.send("I'm working test!")
})


//code by sequelize
app.get("/get_mm__players", async (req, res) => {
    let token = req.headers["authkey"]
    if (!token) {
        let response = commonResponse(0, invalidInputMessage, "")
        res.send(response)
    }
    let user = decodeJwtToken(token, res)
    if (user) {
        let { minimiltia } = await connectLocaldb()
        let result = await minimiltia.findAll();
        if (result) {
            res.send(result)
        } else {
            res.send("err")
        }
    } else {
        let response = commonResponse(0, "Unauthrized access", "")
        res.status(401).send(response);
    }
})

app.post("/rgtrMM", async (req, res) => {
    const { address, city, country, district, email, name, phn_num, pincode, state } = req.body

    let { minimiltia } = await connectLocaldb()
    let result = await minimiltia.create({ address, city, country, district, email, name, phn_num, pincode, state });
    if (result) {
        res.send({ status: "updated" })
    } else {
        res.send("err")
    }
})

app.post("/createPlayOff", async (req, res) => {
    if (!req.body.tmtName) {
        res.send("no valid input data")
    }
    let { minimiltia, tournamentList } = await connectLocaldb()
    let tmtName = req.body.tmtName
    let tmt = await tournamentList.create({ tmtName });


    let regitrTeams = await minimiltia.findAll();
    let sendData = createSchedule(regitrTeams)

    let saveData = sendData.map((data, i) => {
        return { ...data, teamA: data.teamA.id, teamB: data.teamB.id, tmtID: tmt.tmtID }
    })

    let { playoffMatchs } = await connectLocaldb()
    let result = await playoffMatchs.bulkCreate(saveData).catch((err) => {
        // console.log(err);
    })
    if (result) {
        res.send({ status: "updated", response: sendData, saveData: saveData })
    } else {
        res.send([])
    }

})

app.post("/getPlayOff", async (req, res) => {
    if (!req.body.tmtID === null || !req.body.tmtID === undefined) {
        res.send("no valid input data")
    }
    let tmtID = req.body.tmtID
    let { minimiltia, playoffMatchs } = await connectLocaldb()
    let regitrTeams = await playoffMatchs.findAll({
        where: {
            tmtID: tmtID
        },
        include: [
            {
                model: minimiltia,
                as: "TeamA",
            },
            {
                model: minimiltia,
                as: "TeamB",
            }
        ],
    });
    let result = regitrTeams
    if (result) {
        res.send({ status: "updated", response: result, saveData: "saveData" })
    } else {
        res.send([])
    }

})
app.post("/getTmtList", async (req, res) => {
    let { tournamentList } = await connectLocaldb()
    let tmtList = await tournamentList.findAll();
    let result = tmtList
    if (result) {
        res.send({ status: "updated", response: result, saveData: "saveData" })
    } else {
        res.send([])
    }

})

//Auth


app.post("/login", async (req, res) => {
    if (!req.body.email || !req.body.password) {
        let response = commonResponse(0, invalidInputMessage, "")
        res.send(response)
    }
    req.body.email = await checkEmail(req.body.email)
    req.body.password = await checkPassWord(req.body.password)

    if (req.body.email && req.body.password) {
        let { usersRegister } = await connectLocaldb()

        let userData = await usersRegister.findOne({
            attributes: ['user_pass', "user_id", ["user_fname", "name"]],
            required: false,
            raw: true,
            where: { user_email: req.body.email },
        })
        if (userData) {
            let allowLogin = await comparePassword(req.body.password, userData?.user_pass)

            if (allowLogin) {
                let tokenData = { user_id: userData.user_id, name: userData.name }
                const token = encodeJwtToken(tokenData);
                let response = commonResponse(1, "Logged in successfully", { token: token })
                res.send(response)
            } else {
                let response = commonResponse(0, invalidInputMessage, "")
                res.send(response)
            }
        } else {
            let response = commonResponse(0, invalidInputMessage, "")
            res.send(response)
        }

    } else {
        let response = commonResponse(0, invalidInputMessage, "")
        res.send(response)
    }
})

app.post("/register", async (req, res) => {
    if (!req.body.name || !req.body.email || !req.body.password) {
        let response = commonResponse(0, invalidInputMessage, "")
        res.send(response)
    }

    req.body.name = await checkAlpha(req.body.name)
    req.body.email = await checkEmail(req.body.email)
    req.body.password = await checkPassWord(req.body.password)

    if (req.body.name && req.body.email && req.body.password) {
        let { usersRegister } = await connectLocaldb()

        let userData = await usersRegister.findOne({
            attributes: ['user_id'],
            required: false,
            raw: true,
            where: { user_email: req.body.email },
        })
        if (!userData) {
            req.body.password = await hashPassword(req.body.password)
            userData = {
                user_fname: req.body.name,
                user_email: req.body.email,
                user_pass: req.body.password,
            }
            let user = await usersRegister.create(userData);

            if (user) {
                let response = commonResponse(1, "Created Successfully", "")
                res.send(response)
            } else {

                // handel js error to api while function
                let response = commonResponse(0, "unexpected Error", "")
                res.send(response)
            }
        } else {
            let response = commonResponse(0, "Email already exist", "")
            res.send(response)
        }
    } else {
        let response = commonResponse(0, invalidInputMessage, "")
        res.send(response)
    }


})


// handel js error to api while function

// done dynamic form validation components

// node express 