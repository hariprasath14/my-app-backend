const connectMinimiltia = require("./dbShcema/dbPlayers")
const connectPlayoffMatchs = require("./dbShcema/dbPlayoffMatchs")
const connectTournamentList = require("./dbShcema/dbtournamentList")
const connectUsersRegister = require("./dbShcema/usersDB")
const Sequelize = require("sequelize");

// const { awsDb } = require("./connectServerDB") // for server connection

let sequelizeTmnt = 1 === 1 ? new Sequelize("mysql://root:KUXryHtC6sYZ8XaLfRBD@containers-us-west-82.railway.app:6384/railway") : new Sequelize(
    {
        "username": "root",
        "password": "password",
        "database": "my-tmnt-db",
        "host": "localhost",
        "dialect": "mysql"
    });

const minimiltia = connectMinimiltia(sequelizeTmnt, Sequelize);
const playoffMatchs = connectPlayoffMatchs(sequelizeTmnt, Sequelize);
const tournamentList = connectTournamentList(sequelizeTmnt, Sequelize);
const usersRegister = connectUsersRegister(sequelizeTmnt, Sequelize);


playoffMatchs.belongsTo(minimiltia, { foreignKey: "teamA", as: "TeamA" })
playoffMatchs.belongsTo(minimiltia, { foreignKey: "teamB", as: "TeamB" })
playoffMatchs.belongsTo(tournamentList, { foreignKey: "tmtID" })

const exportDb = { minimiltia, playoffMatchs, tournamentList, usersRegister }
const dbConnection = {};

module.exports = async () => {
    if (dbConnection.isConnected) {
        console.log("=> Using existing connection.");
        return exportDb;
    }

    try {
        await sequelizeTmnt.authenticate();
        dbConnection.isConnected = true;
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:');
    }
    return exportDb;
};
