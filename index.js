const express = require("express")
const app= express()

app.get("/",(req,res)=>{
    res.send("hii hari")
})

app.listen(3001,()=>{
    console.log("hello 3001");
})