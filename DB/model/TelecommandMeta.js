'use strict';
module.exports = (sequelize, DataTypes) => {
    var TelecommandMeta = sequelize.define('TelecommandMeta',{
        TelecommandCode:{
            type:DataTypes.INTEGER,
            primaryKey:true
        },
        SatelliteCode:{type:DataTypes.STRING},
        TelecommandName:{type:DataTypes.STRING},
        DataTableName:{type:DataTypes.STRING}
    },{
        tableName: 'TB_TelecommandMeta',
          timestamps: false,
          freezeTableName: true
    });
    return TelecommandMeta;
}