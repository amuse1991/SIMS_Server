const db = require('../DB/db');
const orbitDataModel = require('../DB/model/OrbitData')(db.sequelize,db.Sequelize.DataTypes);
const dataSendTerm = require('../configure/config').GTDsyncTime;
const Op = db.Sequelize.Op

//get
exports.getDataReceiveTerm = (req,res) =>{
    return res.status(200).json({syncTime:dataSendTerm});
}

//get(timeString:string)
exports.getAllOrbitData = (req, res) => {
    let startTime = req.params.timeString;
    let endTime = startTime.substr(0,15) + dataSendTerm + startTime.substr(15+startTime.length);

    orbitDataModel.findAll({
        where:{UTCTime:{[Op.between]:[startTime,endTime]}}
        //group:'SatelliteCode'
    })
        .bind(res)
        .then(data=>{
            return res.status(200).json(data);
        },reason=>{
            return res.status(503).json({error: reason});
        })
};

//post(satelliteCode:string, timeString:string)
exports.getOrbitDataBySatCode = (req,res) => {
    let satCode = req.body.satelliteCode;
    let startTime = req.body.timeString;
    //2초 만큼 시간 증가(dataSendTerm을 2초로 설정해 두었음)
    let endTime = startTime.substr(0,15) + dataSendTerm + startTime.substr(15+startTime.length); 

    orbitDataModel.findAll({where:{
        SatelliteCode:satCode, 
        UTCTime:{[Op.between]:[startTime,endTime]} //2초간의 데이터 조회(120개)
    }})
        .bind(res)
        .then(orbitData=>{
            return res.status(200).json(orbitData);
        },reason=>{
        return res.status(503).json({error: reason});
      });
}