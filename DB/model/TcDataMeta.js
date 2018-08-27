'use strict';
module.exports = (sequelize, DataTypes) => {
    var TcDataMeta = sequelize.define('TcDataMeta',{
        TelecommandCode:{type:DataTypes.INTEGER, primaryKey:true},
        DataName:{type:DataTypes.STRING},
        ChartType:{type:DataTypes.STRING},
        ChartGroup:{type:DataTypes.STRING}
    },{
        tableName: 'TB_TcDataMeta',
          timestamps: false,
          freezeTableName: true
    });
    return TcDataMeta;
}