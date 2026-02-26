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
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
            model: 'users', // Name of the User table
            key: 'id'
        },
        onDelete: 'CASCADE' // If a user is deleted, their products will be deleted as well
    }
},
    {
        tableName: 'products'
    });

Product.associate = function (models) {
    // Define associations here if needed, e.g.:
    // Product.belongsTo(models.User, { foreignKey: 'userId' });
    Product.belongsTo(models.User, { foreignKey: 'userId' }); 
}

export default Product;