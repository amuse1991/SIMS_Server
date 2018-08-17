'use strict';
module.exports = (sequelize, DataTypes) => {
    var TelemetryMeta = sequelize.define('TelemetryMeta',{
        TelemetryCode:{
            type:DataTypes.INTEGER,
            primaryKey:true
        },
        SatelliteCode:{type:DataTypes.STRING},
        TelemetryName:{type:DataTypes.STRING},
        DataTableName:{type:DataTypes.STRING}
    },{
        tableName: 'TB_TelemetryMeta',
        timestamps: false,
        freezeTableName: true
    });
    return TelemetryMeta;
}