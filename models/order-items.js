import { Sequelize } from "sequelize";
import { sequelize } from "../utils/db.js";

const OrderItems = sequelize.define('OrderItems', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
    },
    products: {
        type: Sequelize.JSON,
    },
    
},
    {
        tableName: 'order_items'
    });

export default OrderItems;