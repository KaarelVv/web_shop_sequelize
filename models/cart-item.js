import { Sequelize } from "sequelize";
import { sequelize } from "../utils/db.js";

const CartItem = sequelize.define('CartItem', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    quantity: {
        type: Sequelize.INTEGER,
    },
});

export default CartItem;