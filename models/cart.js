import { Sequelize } from "sequelize";
import { sequelize } from "../utils/db.js";

const Cart = sequelize.define('Cart', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
},
    {
        tableName: 'carts'
    });
Cart.associate = function (models) {
    Cart.belongsTo(models.User, {
        foreignKey: 'userId'
    }); // Assuming a cart belongs to one user
    Cart.belongsToMany(models.Product, {
        through: models.CartItem, foreignKey: 'cartId'
    }); // Assuming a cart can have many products through CartItem
};
export default Cart;