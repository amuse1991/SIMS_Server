const db = require('../DB/db');
const orbitDataModel = require('../DB/model/OrbitData')(db.sequelize,db.Sequelize.DataTypes);
const Op = db.Sequelize.Op

exports.getOrbitData = (req, res) => {
    //TODO : return orbitData
    //TODO : req.params.time + 1초 데이터를 반환
    const satCode = req.params.satelliteCode;
    const time = req.params.time;
    console.log(time);
    orbitDataModel.findAll({
        where:{
            [Op.and]:[
                {SatelliteCode:satCode},
                {UTCTime:time}
            ]
        }
    }).then(orbitData=>{
        console.log(orbitData);
        return res.json(orbitData);
      })
      
};