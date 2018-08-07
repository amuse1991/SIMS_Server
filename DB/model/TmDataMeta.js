'use strict';
module.exports = (sequelize, DataTypes) => {
    var TmDataMeta = sequelize.define('TmDataMeta',{
        TelemetryCode:{type:DataTypes.INTEGER},
        DataName:{type:DataTypes.STRING},
        ChartType:{type:DataTypes.STRING}
    });
    return TmDataMeta;
}