import { Sequelize } from "sequelize";
import { sequelize } from "../utils/db.js";

const Order = sequelize.define('Order', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    totalPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
}
    ,
    {
        tableName: 'order'
    });

Order.associate = function (models) {
    Order.hasMany(models.User, { 
        foreignKey: 'userId' 
    });
    Order.belongsToMany(models.Product, {
        through: models.OrderItems, foreignKey: 'orderId'
    });
};

export default Order;