'use strict';
module.exports = (sequelize, DataTypes) => {
    var OrbitData = sequelize.define('OrbitData',{
        SatelliteCode:{
            type:DataTypes.STRING,
            primaryKey:true
        },
        UTCTime:{type:DataTypes.STRING},
        Lat:{type:DataTypes.REAL},
        Long:{type:DataTypes.REAL},
        Alt:{type:DataTypes.REAL},
        DateOfEntry:{type:DataTypes.DATE}
    },{
        tableName: 'TB_OrbitData',
        timestamps: false,
        freezeTableName: true
      });
    return OrbitData;
}