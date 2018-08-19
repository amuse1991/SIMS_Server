const db = require('../DB/db');
const Op = db.Sequelize.Op

//post(telemetryCode:string, (showColumn:boolean))
exports.getMeta = (req,res) => {
    let model = require('../DB/model/TelemetryMeta')(db.sequelize,db.Sequelize.DataTypes);
    let tmCode = req.body.telemetryCode;
    let option = req.body.showColumns || null; //show columns가 없으면 null로 채운다.
    model.findOne({where:{TelemetryCode:tmCode}})
        .bind(res)
        .then(meta=>{ //데이터 read
            return meta;
        },reason=>{
            return res.status(503).json({error: reason});
        })
        .then(meta=>{ //option 처리
            if(option === null || option === false){
                return res.status(200).json(meta); //option이 없는 경우 그냥 반환
            }else{ //option이 있는 경우
                let dataModel = require('../DB/model/TmDataMeta')(db.sequelize,db.Sequelize.DataTypes);
                if(option){
                    dataModel.findAll({ // 컬럼 정보 조회
                        attributes:['DataName','ChartType'],
                        where:{TelemetryCode:tmCode}
                    })
                    .then(columns=>{
                        meta.dataValues.columns = columns; //기존 정보에 컬럼 정보 추가
                        return res.status(200).json(meta);
                    },reason=>{
                        return res.status(503).json({error:reason});
                    });
                }else{
                    return res.status(400).json({error:'There is a problem with the showColumns field. (The show Columns field only accepts boolean values.)'})
                }
            }
        },reason=>{
            return res.status(503).json({error: reason}); //Service Unavailable
        });
}

//post(telemetryCode:string, selectOption:{selectItems:[string(default==all)],searchCond:string(default==null)}})
exports.getData = (req,res) => {

}

//post(telemetryCode:string, selectOption:{selectItems:[string(default==all)],searchCond:string(default==null)}})
exports.getChartType = (req,res) => {
    let model = require('../DB/model/TmDataMeta')(db.sequelize,db.Sequelize.DataTypes);
    let tmCode = req.body.telemetryCode;
    let option = req.body.selectOption || {selectItems:'all', searchCond:null}; // select option이 전달되지 않은 경우 디폴트 값으로 설정
    model.findAll({
        attributes:['DataName','ChartType'],
        where:{TelemetryCode:tmCode}})
        .bind(res)
        .then(result=>{ //데이터 read
            return result;
        },reason=>{
            return res.status(503).json({error:reason});
        }) //TODO:select option 처리
        .then(result=>{
            
        },reason=>{

        })
}