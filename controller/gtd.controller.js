const db = require('../DB/db');
const orbitDataModel = require('../DB/model/OrbitData')(db.sequelize,db.Sequelize.DataTypes);
const Op = db.Sequelize.Op

//get
exports.getAllOrbitData = (req, res) => {
    orbitDataModel.findAll({group:SatelliteCode})
        .bind(res)
        .then(data=>{
            return res.status(200).json(data);
        },reason=>{
            return res.status(503).json({error: reason});
        })
};

//post(satCode:string, time:string)
exports.getOrbitDataBySatCode = (req,res) => {
    let satCode = req.body.satelliteCode;
    //let time = req.body.time;

    orbitDataModel.findAll({where:{SatelliteCode:satCode}})
        .bind(res)
        .then(orbitData=>{
            return res.status(200).json(orbitData);
        },reason=>{
        return res.status(503).json({error: reason});
      });
}