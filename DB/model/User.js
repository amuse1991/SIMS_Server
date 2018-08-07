'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User',{
        ID:{type:DataTypes.STRING},
        Pwd:{type:DataTypes.STRING},
        UserName:{type:DataTypes.STRING},
        Dept:{type:DataTypes.STRING},
        Position:{type:DataTypes.STRING},
        Email:{type:DataTypes.STRING},
        Phone:{type:DataTypes.STRING}
    });
    return User;
}