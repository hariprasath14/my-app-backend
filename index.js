const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const cors = require("cors")
const axios = require("axios")
const { awsDb } = require("./connect-db")
const connectLocaldb = require("./db/connectLocalDB")


const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "moviereview",
})

const tournamentDB = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "tournament",
})

let serverPort = process.env.PORT || 3001
app.listen(serverPort, () => {
    console.log("hello 3001");
    // const sqlSelect = "SELECT * FROM mini_miltia"
    // tournamentDB.query(sqlSelect, (err, result) => {
    //     console.log("err, result",serverPort, result);
    // })
})

// app.use("/", (req, res) => {
//     res.send("new working!")
// })
app.get("/", (req, res) => {
    console.log("323", db);
    res.send("I'm working!")
})
// var http = require('http');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.end('Hello Wor6ld\n');
// }).listen(1337, "127.0.0.14");
// console.log('Server running at http://127.0.0.14:1337/');

app.post("/save_movie", (req, res) => {
    const name = req.body.movie_name
    const review = req.body.movie_review
    const rating = req.body.movie_rating
    const sqlInsert = "INSERT INTO movies (name,review,rating) VALUES (?,?,?)"
    db.query(sqlInsert, [name, review, rating], ((err, result) => {
        console.log(err, result);
        res.send(result)
    }))
})

app.get("/get_movie", (req, res) => {
    const sqlSelect = "SELECT * FROM movies"
    console.log("1245", db);
    db.query(sqlSelect, (err, result) => {
        console.log("err, result", err, result);
        setTimeout(() => {
            res.send(result)
        }, 3000);
    })
})

app.delete("/delete_movie/:id", (req, res) => {
    const id = req.params.id
    const sqlDelete = "DELETE FROM movies WHERE id = ?"
    console.log("delete", id);
    db.query(sqlDelete, id, (err, result) => {
        res.send(result)
    })
})

app.put("/update_movie", (req, res) => {
    const id = req.body.id
    const review = req.body.review
    console.log("update", review);

    const sqlUpdate = "UPDATE movies SET review = ? WHERE id = ?"
    db.query(sqlUpdate, [review, id], (err, result) => {
        res.send(err)
    })
})


// app.get("/get_mm__players", (req, res) => {
//     const sqlSelect = "SELECT * FROM minimiltia"
//     awsDb.query(sqlSelect, (err, result) => {
//         console.log("err, result",err, result);
//         setTimeout(() => {
//             res.send(result)
//         }, 3000);
//     })
// })

// app.post("/rgtrMM", (req, res) => {
//     const { address, city, country, district, email, name, phn_num, pincode, state } = req.body
//     const sqlInsert = "INSERT INTO minimiltia (address, city, country, district, email, name, phn_num, pincode, state) VALUES (?,?,?,?,?,?,?,?,?)"
//     console.log("save 10", req.body);
//     awsDb.query(sqlInsert, [address, city, country, district, email, name, phn_num, pincode, state], ((err, result) => {
//         console.log(err, result);
//         res.send({...result,status:"updated"})
//     }))
// })


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
    // const sqlSelect = "SELECT * FROM minimiltia"
    // tournamentDB.query(sqlSelect, (err, result) => {
    //     console.log("err, result", err, result);
    //     setTimeout(() => {
    //         res.send(result)
    //     }, 3000);
    // })
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

    // const sqlInsert = "INSERT INTO minimiltia (address, city, country, district, email, name, phn_num, pincode, state) VALUES (?,?,?,?,?,?,?,?,?)"
    // console.log("save 10", req.body);
    // tournamentDB.query(sqlInsert, [address, city, country, district, email, name, phn_num, pincode, state], ((err, result) => {
    //     console.log(err, result);
    //     res.send({ ...result, status: "updated" })
    // }))
})
app.post("/createPlayOff", async (req, res) => {

    const { matchId, teamA, teamB, teamAPoints, teamBPoints, matchDt, matchTs, winner } = req.body

    let { playoffMatchs } = await connectLocaldb()
    let result = await playoffMatchs.create({ matchId, teamA, teamB, teamAPoints, teamBPoints, matchDt, matchTs, winner });
    console.log("res2", result);
    if (result) {
        res.send({ status: "updated" })
    } else {
        res.send("err")
    }

})