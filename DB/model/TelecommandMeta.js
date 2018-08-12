'use strict';
module.exports = (sequelize, DataTypes) => {
    var TelecommandMeta = sequelize.define('TelecommandMeta',{
        TelecommandCode:{type:DataTypes.INTEGER},
        SatelliteCode:{type:DataTypes.STRING},
        TelecommandName:{type:DataTypes.STRING},
        DataTableName:{type:DataTypes.STRING},
        TcDataMetaCode:{type:DataTypes.INTEGER}
    },{
        tableName: 'TB_TelecommandMeta',
          timestamps: false,
          freezeTableName: true
    });
    return TelecommandMeta;
}