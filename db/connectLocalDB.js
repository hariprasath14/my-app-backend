const connectMinimiltia = require("./dbShcema/dbTournament")
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


const exportDb = { minimiltia }

module.exports = async () => {
    return exportDb
}

