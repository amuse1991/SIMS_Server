const db = require('../DB/db');
const orbitDataModel = require('../DB/model/OrbitData')(db.sequelize,db.Sequelize.DataTypes);
const Op = db.Sequelize.Op

//get
exports.getAllOrbitData = (req, res) => {
};

//post(satCode:string, time:string)
exports.getOrbitDataBySatCode = (req,res) => {
    let satCode = req.body.satelliteCode;
    let time = req.body.time;

    orbitDataModel.findAll({where:{SatelliteCode:satCode}})
        .bind(res)
        .then(orbitData=>{
        console.log(orbitData);
        return res.json(orbitData);
      })

}