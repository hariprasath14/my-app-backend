const connectMinimiltia = require("./dbShcema/dbTournament")
const connectPlayoffMatchs = require("./dbShcema/dbPlayoffMatchs")
const Sequelize = require("sequelize");

let sequelizeTmnt = new Sequelize(
    {
        "username": "root",
        "password": "password",
        "database": "tournament",
        "host": "localhost",
        "dialect": "mysql"
    });

const minimiltia = connectMinimiltia(sequelizeTmnt, Sequelize);
const playoffMatchs = connectPlayoffMatchs(sequelizeTmnt, Sequelize);


const exportDb = { minimiltia, playoffMatchs }

module.exports = async () => {
    return exportDb
}

