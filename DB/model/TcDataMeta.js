'use strict';
module.exports = (sequelize, DataTypes) => {
    var TcDataMeta = sequelize.define('TcDataMeta',{
        TelecommandCode:{type:DataTypes.INTEGER},
        DataName:{type:DataTypes.STRING},
        ChartType:{type:DataTypes.STRING}
    });
    return TcDataMeta;
}