const Category = db.define('category');
const User = db.define('user');

const ImageDetails = db.define(
    "imageDetails",
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        imageName: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        imageURL: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        downloads: {
            type: Sequelize.INTEGER,
            default: 0,
            // allowNull: false,
        },
        contributorID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        categoryID: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        
    },
    {
        timestamps: false,
        freezeTableName: true,
    }
);

ImageDetails.hasOne(User, {
    sourceKey: 'contributorID',
    foreignKey: 'id'
});

ImageDetails.hasMany(Category, {
    sourceKey: 'categoryID',
    foreignKey: 'categoryID'
});


module.exports = ImageDetails;