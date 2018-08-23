const db = require('../DB/db');
const orbitDataModel = require('../DB/model/OrbitData')(db.sequelize,db.Sequelize.DataTypes);
const Op = db.Sequelize.Op

//get(timeString:string, term)
exports.getAllOrbitData = (req, res) => {
    let startTime = req.params.timeString;
    let term = req.params.term;
    let endTime = startTime.substr(0,15) + term + startTime.substr(15+startTime.length);

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
    let endTime = startTime.substr(0,15) + term + startTime.substr(15+startTime.length); 

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