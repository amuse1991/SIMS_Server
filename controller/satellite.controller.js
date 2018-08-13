const db = require('../DB/db');
const satelliteModel = require('../DB/model/Satellite')(db.sequelize,db.Sequelize.DataTypes);
const Op = db.Sequelize.Op;


exports.getSatelliteList = (req,res) => {
    satelliteModel.findAll()
        .bind(res)
        .then(satellites=>{
            return res.status(200).json(satellites);
        },reason=>{ //데이터 가져오지 못한 경우
            return res.status(503).json({error: reason}); //Service Unavailable
        });
};


exports.getInfo = (req,res) => {
    let satelliteCode = req.body.satelliteCode;
    satelliteModel.findOne({where:{SatelliteCode:satelliteCode}})
        .bind(res)
        .then(satellite=>{
            return res.status(200).json(satellite);
        },reason=>{ //데이터 가져오지 못한 경우
            return res.status(503).json({error: reason}); //Service Unavailable
        });
}

exports.getTMnameListBySatCode = (req,res) => {
    let satelliteCode = req.body.satelliteCode;
}

exports.getTCnameListBySatCode = (req,res) => {
    let satelliteCode = req.body.satelliteCode;
}