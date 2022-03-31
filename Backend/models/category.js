const Category = db.define(
    "category",
    {
        categoryID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        categoryName: {
            type: Sequelize.STRING,
            allowNull: false,
        }
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

module.exports = Category;