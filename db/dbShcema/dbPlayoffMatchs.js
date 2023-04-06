module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "playoffmatchs",
        {
            matchId: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            tmtID: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
            },
            teamA: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            teamB: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            teamAPoints: {
                type: DataTypes.STRING(45),
            },
            teamBPoints: {
                type: DataTypes.STRING(45),
            },
            matchDt: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            matchTs: {
                type: DataTypes.STRING(45),
            },
            winner: {
                type: DataTypes.STRING(45),
            },

        },
        {
            tableName: "playoffmatchs",
            timestamps: false,
        }
    );
}