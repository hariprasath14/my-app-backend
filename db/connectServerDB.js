const mysql = require("mysql")

module.exports.awsDb = mysql.createPool({
    host: "myapp-tournament.cr9kqqj1iema.ap-northeast-1.rds.amazonaws.com",
    user: "admin",
    password: "hariprasath",
    database: "tournament",
    port:3306
})
