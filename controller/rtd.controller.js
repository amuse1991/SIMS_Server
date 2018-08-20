const io = require('socket.io-client');
const serverConfig = require('../configure/config').serverConfig;
const db = require('../DB/db');
const Op = db.Sequelize.Op;
const dummyHost = `http://${serverConfig.host}:${serverConfig.dummyServerPort}`;
/*
exports.connectionTest = (req,res)=>{
    console.log('connection test called');
    const socket = io('http://localhost:3003');
    socket.on('connect', () => {
        //console.log(socket.id); // 'G5p5...'
        console.log('connected')
        socket.emit('request_telemetry','WOD');
      });
    socket.on('response_telemetry',function(msg){
        console.log(msg);
    });
};

exports.disconnectionTest = (req,res)=>{
    //TODO: disconnect 구현
};

exports.getTelemetry = (req,res) => {
    console.log('get real time telemetry api called');
    const rtdType = req.params.rtdType;
    //dummy server 연결
    console.log('connection test called');
    const socket = io(dummyHost);
    socket.on('connect', () => {
        console.log('connected')
        socket.emit('request_telemetry','FCS');
      });
    socket.on('response_telemetry',function(msg){
        
        console.log(msg)
    });
}
*/
exports.connect = (req,res) => {
    const rtdType = req.params.rtdType;
    //dummy server 연결
    const socket = io(dummyHost);
    socket.on('connect', () => {
        console.log('connected')
        socket.emit('request_telemetry',rtdType);
      });
    socket.on('response_telemetry',function(msg){
        console.log(msg)
    });
}

exports.disconnect = (req,res) => {
    
}

exports.getTMlistBySatCode = (req,res) => {
    let satCode = req.body.satelliteCode;
    let model = require('../DB/model/TelemetryMeta')(db.sequelize,db.Sequelize.DataTypes);
    model.findAll({attributes:['TelemetryName','TelemetryCode'],where:{SatelliteCode:satCode}})
        .bind(res)
        .then(list=>{
            return res.status(200).json(list);
        },reason=>{
            return res.status(503).json({error: reason});
        });
}

exports.getTClistBySatCode = (req,res) => {
    let satCode = req.body.satelliteCode;
    let model = require('../DB/model/TelecommandMeta')(db.sequelize,db.Sequelize.DataTypes);
    model.findAll({attributes:['TelecommandName','TelecommandCode'],where:{SatelliteCode:satCode}})
        .bind(res)
        .then(list=>{
            return res.status(200).json(list);
        },reason=>{
            return res.status(503).json({error: reason});
        });
}