module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "users_register",
        {
            user_id: {
                type: DataTypes.INTEGER(11),
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            user_fname: {
                type: DataTypes.STRING(45),
            },
            user_lname: {
                type: DataTypes.STRING(45),
            },
            user_pass: {
                type: DataTypes.STRING(200),
            },
            user_email: {
                type: DataTypes.STRING(100),
            },
            profile_setup: {
                type: DataTypes.STRING(45),
            },
            email_verify: {
                type: DataTypes.STRING(45),
            },
            is_active: {
                type: DataTypes.STRING(45),
            },
            is_deleted: {
                type: DataTypes.STRING(45),
            },

        },
        {
            tableName: "users_register",
            timestamps: false,
        }
    );
}