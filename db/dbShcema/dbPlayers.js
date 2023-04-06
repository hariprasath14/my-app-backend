module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "minimiltia",
        {
            id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            address: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            country: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            district: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            name: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            phn_num: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            pincode: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING(45),
                allowNull: false,
            },
        },
        {
            tableName: "minimiltia",
            timestamps: false,
        }
    );
}