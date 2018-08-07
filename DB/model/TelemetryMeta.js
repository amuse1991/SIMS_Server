'use strict';
module.exports = (sequelize, DataTypes) => {
    var TelemetryMeta = sequelize.define('TelemetryMeta',{
        TelemetryCode:{type:DataTypes.INTEGER},
        SatelliteCode:{type:DataTypes.STRING},
        TelemetryName:{type:DataTypes.STRING},
        DataTableName:{type:DataTypes.STRING},
        TmDataMetaCode:{type:DataTypes.INTEGER}
    });
    return TelemetryMeta;
}