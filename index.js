const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const axios = require("axios")
const connectLocaldb = require("./db/connectLocalDB")
const { createSchedule } = require("./common/createSchedule")


const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


let serverPort = process.env.PORT || 3001

app.listen(serverPort, () => {
    console.log("hello 3001");
})

app.get("/", (req, res) => {
    res.send("I'm working!")
})


//code by sequelize
app.get("/get_mm__players", async (req, res) => {
    console.log("hii");
    let { minimiltia } = await connectLocaldb()
    let result = await minimiltia.findAll();
    if (result) {
        res.send(result)
    } else {
        res.send("err")
    }
})

app.post("/rgtrMM", async (req, res) => {
    const { address, city, country, district, email, name, phn_num, pincode, state } = req.body

    let { minimiltia } = await connectLocaldb()
    let result = await minimiltia.create({ address, city, country, district, email, name, phn_num, pincode, state });
    console.log("res", result);
    if (result) {
        res.send({ status: "updated" })
    } else {
        res.send("err")
    }
})

app.post("/createPlayOff", async (req, res) => {
    console.log("reerre", req.body);
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
    console.log("red43red4re3derre", req.body);
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