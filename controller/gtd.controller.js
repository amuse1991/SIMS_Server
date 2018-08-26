const db = require('../DB/db');
const orbitDataModel = require('../DB/model/OrbitData')(db.sequelize,db.Sequelize.DataTypes);
const moment = require('moment');
const Op = db.Sequelize.Op

//get(timeString:string, term)
exports.getAllOrbitData = (req, res) => {
    let startTime = req.params.timeString;
    let term = req.params.term;
    if(term !== 30){
        term = 30
    }
    let endTime = _getEndTime(startTime,term);

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

//post(satelliteCode:string, timeString:string, term:int)
exports.getOrbitDataBySatCode = (req,res) => {
    let satCode = req.body.satelliteCode;
    let startTime = req.body.timeString;
    let term = req.body.term;
    //term 만큼 시간 증가
    //임시 코드. 지금은 항상 term을 30분으로 한다. 추후 설정 가능하도록 할 것
    if(term !== 30){
        term = 30
    }

    let endTime = _getEndTime(startTime,term);
    orbitDataModel.findAll({where:{
        SatelliteCode:satCode, 
        UTCTime:{[Op.between]:[startTime,endTime]} //term 동안의 데이터 조회
    }})
        .bind(res)
        .then(orbitData=>{
            return res.status(200).json(orbitData);
        },reason=>{
        return res.status(503).json({error: reason});
      });
}

_getEndTime = (startTime,term)=>{ //30분만큼 시간을 증가시켜 반환
    let endTime = moment(startTime).add(term,'m')._d.toTimeString();
    return startTime.substr(0,11) + endTime.substr(0,8);
}