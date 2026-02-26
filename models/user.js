import { Sequelize } from "sequelize";
import { sequelize } from "../utils/db.js";

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    passwordHash: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    }
},
    {
        tableName: 'users'
    });

User.associate = function (models) {
    // Define associations here if needed, e.g.:
    // User.hasMany(models.Order, { foreignKey: 'userId' });
    User.hasMany(models.Product, { foreignKey: 'userId' }); // Assuming a user can have many products
    User.hasOne(models.Cart, { foreignKey: 'userId' }); // Assuming a user has one cart
};

export default User;