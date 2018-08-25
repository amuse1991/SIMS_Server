'use strict';
module.exports = (sequelize, DataTypes) => {
    var TmDataMeta = sequelize.define('TmDataMeta',{
        TelemetryCode:{type:DataTypes.INTEGER, primaryKey:true},
        DataName:{type:DataTypes.STRING},
        ChartType:{type:DataTypes.STRING},
        ChartGroup:{type:DataTypes.STRING}
    },{
        tableName: 'TB_TmDataMeta',
        timestamps: false,
        freezeTableName: true
    });
    return TmDataMeta;
}