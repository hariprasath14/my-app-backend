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


playoffMatchs.belongsTo(minimiltia, { foreignKey: "teamA", as: "TeamA" })
playoffMatchs.belongsTo(minimiltia, { foreignKey: "teamB", as: "TeamB" })

const exportDb = { minimiltia, playoffMatchs }
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
        console.error('Unable to connect to the database:', error);
      }
    return exportDb;
};
