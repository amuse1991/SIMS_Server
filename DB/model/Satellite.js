'use strict';
module.exports = (sequelize, DataTypes) => {
    // 모델 정의
    var Satellite = sequelize.define('Satellite',{
        SatelliteCode:{
            type:DataTypes.STRING,
            primaryKey:true
        },
        SatelliteName:{type:DataTypes.STRING},
        ImgSource:{type:DataTypes.STRING},
        LaunchDate:{type:DataTypes.DATE}
    },{
        tableName: 'TB_Satellite',
          timestamps: false,
          freezeTableName: true
    });

    //TODO : FK 연결
    /*
    Satellite.associate = function(models){
        models.Satellite.hasMany(models.OrbitData);
    };
    */
    return Satellite;
}