const express = require("express")
const mysql = require("mysql")
const bodyParser = require("body-parser")
const cors = require("cors")


const app = express()
app.listen(3001, () => {
    console.log("hello 3001");
})

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "password",
    database: "moviereview"
})


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
    db.query(sqlSelect, (err, result) => {
        console.log(err);
        res.send(result)
    })
})

app.delete("/delete_movie/:id", (req, res) => {
    const id = req.params.id
    const sqlDelete = "DELETE FROM movies WHERE id = ?"
    console.log("delete",id);
    db.query(sqlDelete, id, (err, result) => {
        res.send(result)
    })
})

app.put("/update_movie", (req, res) => {
    const id = req.body.id
    const review = req.body.review
    console.log("update",review);

    const sqlUpdate = "UPDATE movies SET review = ? WHERE id = ?"
    db.query(sqlUpdate, [review, id], (err, result) => {
        res.send(err)
    })
})