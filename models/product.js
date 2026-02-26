import { Sequelize } from "sequelize";
import { sequelize } from "../utils/db.js";


const Product = sequelize.define('Product', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    title: Sequelize.STRING,
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false
    }
},
    {
        tableName: 'products'
    });

export default Product;