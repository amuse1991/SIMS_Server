'use strict';
module.exports = (sequelize, DataTypes) => {
    // 모델 정의
    var Satellite = sequelize.define('Satellite',{
        SatelliteCode:{type:DataTypes.STRING},
        SatelliteName:{type:DataTypes.STRING}
    });

    //TODO : FK 연결
    /*
    Satellite.associate = function(models){
        models.Satellite.hasMany(models.OrbitData);
    };
    */
    return Satellite;
}