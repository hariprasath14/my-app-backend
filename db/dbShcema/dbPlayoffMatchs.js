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
                allowNull: false,
            },
            teamBPoints: {
                type: DataTypes.STRING(45),
                allowNull: false,
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
                allowNull: false,
            },

        },
        {
            tableName: "playoffmatchs",
            timestamps: false,
        }
    );
}