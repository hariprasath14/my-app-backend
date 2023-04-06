module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "tournamentList",
        {
            tmtID: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            tmtName: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },

        },
        {
            tableName: "tournamentList",
            timestamps: false,
        }
    );
}