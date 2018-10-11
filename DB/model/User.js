'use strict';
module.exports = (sequelize, DataTypes) => {
    var User = sequelize.define('User',{
        Id:{type:DataTypes.STRING},
        Pwd:{type:DataTypes.STRING},
        UserName:{type:DataTypes.STRING},
        Dept:{
            type:DataTypes.STRING, 
            defaultValue:"NULL"
        },
        Position:{
            type:DataTypes.STRING,
            defaultValue:"NULL"
        },
        Email:{
            type:DataTypes.STRING,
            defaultValue:"NULL"
        },
        Phone:{
            type:DataTypes.STRING,
            defaultValue:"NULL"
        }
    },{
        tableName: 'TB_User',
          timestamps: false,
          freezeTableName: true
      });
    return User;
}