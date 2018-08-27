const db = require('../DB/db');
const Op = db.Sequelize.Op;


exports.getSatelliteList = (req,res) => {
    let model = require('../DB/model/Satellite')(db.sequelize,db.Sequelize.DataTypes);
    model.findAll()
        .bind(res)
        .then(satellites=>{
            return res.status(200).json(satellites);
        },reason=>{ //데이터 가져오지 못한 경우
            return res.status(503).json({error: reason}); //Service Unavailable
        });
};


exports.getInfo = (req,res) => {
    let model = require('../DB/model/Satellite')(db.sequelize,db.Sequelize.DataTypes);
    let satelliteCode = req.body.satelliteCode;
    model.findOne({where:{SatelliteCode:satelliteCode}})
        .bind(res)
        .then(satellite=>{
            return res.status(200).json(satellite);
        },reason=>{ //데이터 가져오지 못한 경우
            return res.status(503).json({error: reason}); //Service Unavailable
        });
}

exports.getTMmetaListBySatCode = (req,res) => {
    let model = require('../DB/model/TelemetryMeta')(db.sequelize,db.Sequelize.DataTypes);
    let satelliteCode = req.body.satelliteCode;
    model.findAll({where:{SatelliteCode:satelliteCode}})
        .bind(res)
        .then(tmMetas=>{
            return res.status(200).json(tmMetas)
        },reason=>{
            return res.status(503).json({error: reason}); //Service Unavailable
        });
}

exports.getTCmetaListBySatCode = (req,res) => {
    let model = require('../DB/model/TelecommandMeta')(db.sequelize,db.Sequelize.DataTypes);
    let satelliteCode = req.body.satelliteCode;
    model.findAll({where:{SatelliteCode:satelliteCode}})
        .bind(res)
        .then(tmMetas=>{
            return res.status(200).json(tmMetas)
        },reason=>{
            return res.status(503).json({error: reason}); //Service Unavailable
        });
}

exports.getSatCount = (req,res) => {
    let model = require('../DB/model/Satellite')(db.sequelize,db.Sequelize.DataTypes);
    model.findAndCountAll()
        .bind(res)
        .then(count=>{
            return res.status(200).json({count:count.count});
        },reason=>{
            return res.status(503).json({error: reason});
        });
}