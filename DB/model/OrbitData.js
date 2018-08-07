'use strict';
module.exports = (sequelize, DataTypes) => {
    var OrbitData = sequelize.define('OrbitData',{
        SatelliteCode:{type:DataTypes.STRING},
        UTCTime:{type:DataTypes.DATE},
        Lat:{type:DataTypes.REAL},
        Long:{type:DataTypes.REAL},
        Alt:{type:DataTypes.REAL},
        DateOfEntry:{type:DataTypes.DATE}
    });
    return OrbitData;
}