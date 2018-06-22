const Sequelize = require('sequelize');

module.exports = function(sequelize) {

    //first parameter will define the table name in singular if table name is not explicitly defined in third parameter's property
    //timestamps is set to false so that addedOn and updatedOn values are not automatically passed to the database when using CRUD operations
    const Users = sequelize.define('users', {
        fml: {type: Sequelize.STRING, allowNull: false},
        salary: {type: Sequelize.FLOAT},
        email: {type: Sequelize.STRING},
        history: {type: Sequelize.INTEGER}
    }, { tableName: 'Users', timestamps: false });

    return Users;
};