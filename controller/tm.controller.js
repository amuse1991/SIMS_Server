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

//post(telemetryCode:string, startDate:string, endDate:string)
exports.getData = async (req,res) => {
    let tmCode = req.body.telemetryCode || null;
    let startDate = req.body.startDate || null;
    let endDate = req.body.endDate || null;
    //정보가 누락된 경우 400에러
    if(tmCode === null || startDate === null || endDate === null){
        return res.status(400).json({error:'One of the information is missing: telemetryCode, startDate, or endDate.'});
    }
    let model = require('../DB/model/TelemetryMeta')(db.sequelize,db.Sequelize.DataTypes);
    model.findOne({where:{TelemetryCode:tmCode}}) //meta정보 조회
        .bind(res)
        .then(tmMeta=>{
            let table = tmMeta.dataValues.DataTableName;
            let dataModel = require(`../DB/model/telemetry/${table}`)(db.sequelize,db.Sequelize.DataTypes);
            dataModel.findAll({ //데이터 검색
                where:{Time:{[Op.between]:[startDate,endDate]}}
                /* test시 유의사항
                    FCS데이터는 2016-06-03
                    WOD데이터는 2015-12-16, 2016-02-03~04 데이터가 있음
                    기간 설정시 유의할 것
                */
            }) 
            .then(data=>{
                return res.status(200).json(data);
            },reason=>{
                return res.status(503).json({error:reason});
            })
        },reason=>{
            return res.status(503).json({error:reason});
        });
}
/*
_gruopDataByTime = (data)=>{
    console.log("called");
    let time;
    let currentIdx;
    let result = [];
    data.forEach((item,idx)=>{
        if(idx==0){
            time = item.Time;
            result[0] = item;
            currentIdx = 0;
        }else{
            if(time == item.Time){
                result[currentIdx] = item;
            }else{
                currentIdx++;
                result[currentIdx] = item;
            }
        }
    })
    console.log("function end")
    return result;
}
*/
//post(telemetryCode:string, selectOption:{selectItems:[string(default==all)],searchCond:string(default==null)}})
exports.getChartType = (req,res) => {
    let model = require('../DB/model/TmDataMeta')(db.sequelize,db.Sequelize.DataTypes);
    let tmCode = req.body.telemetryCode;
    let option = req.body.selectOption || {selectItems:'all', searchCond:null}; // select option이 전달되지 않은 경우 디폴트 값으로 설정
    model.findAll({
        attributes:['DataName','ChartType','ChartGroup'],
        where:{TelemetryCode:tmCode}})
        .bind(res)
        .then(result=>{ //데이터 read
            return result;
        },reason=>{
            return res.status(503).json({error:reason});
        }) 
        .then(result=>{
            if(option.selectItems === 'all' && option.searchCond === null){
                return res.status(200).json(result); //option이 없는 경우 전체 결과 반환
            }
            //TODO:select option 처리 구현
        },reason=>{
            return res.status(503).json({error:reason});
        })
}

// //post(telemetryCode, startDate, endDate, selectOption)
// exports.getDataForCharting = (req,res)=>{
//     let tmCode = req.body.telemetryCode || null;
//     let startDate = req.body.startDate || null;
//     let endDate = req.body.endDate || null;
//     if(tmCode === null || startDate === null || endDate === null){
//         return res.status(400).json({error:'One of the information is missing: telemetryCode, startDate, or endDate.'});
//     }
//     let model = require('../DB/model/TelemetryMeta')(db.sequelize,db.Sequelize.DataTypes);
//     model.findOne({attributes:['TelemetryName'],where:{TelemetryCode:tmCode}}) //tm meta정보 조회
//         .bind(res)
//         .then((tmMeta)=>{
//             tmName = tmMeta.dataValues.TelemetryName;
//             dataModel = require(`../DB/model/telemetry/${tmName}`)(db.sequelize,db.Sequelize.DataTypes);
//             dataModel.findAll({ //데이터 검색
//                 where:{Time:{[Op.between]:[startDate,endDate]}}
//                 /* test시 유의사항
//                     FCS데이터는 2016-06-03
//                     WOD데이터는 2015-12-16, 2016-02-03~04 데이터가 있음
//                     기간 설정시 유의할 것
//                 */
//             })
//             .then(data=>{
//                 chartModel = require('../DB/model/TmDataMeta')(db.sequelize,db.Sequelize.DataTypes);
//                 chartModel.findAll({where:{TelemetryCode:tmCode}})
//                 .bind(data)
//                 .then(chartTypes=>{
//                     let result = _makeChartData(data,chartTypes);
//                     return res.status(200).json(result);
//             })
//         })
//     })
// }

// _makeChartData = (data,chartTypes) => {
//     let res = {chartGroup:[], chartData:[]};
//     chartTypes.sort((a,b)=>{
//         let groupA = a.ChartGroup.toUpperCase();
//         let groupB = b.ChartGroup.toUpperCase();
//         if (groupA < groupB) {
//             return -1;
//         }
//         if (groupA > groupB) {
//             return 1;
//         }
//         //같을 경우
//         return 0;
//     })

//     //차트그룹 생성
//     let currentGroup;
//     for(let i=0; i<chartTypes.length; i++){
//         let item = chartTypes[i];
//         if(item.ChartGroup === currentGroup){
//             continue;
//         }
//         else{
//             res.chartGroup.push(item.ChartGroup);
//             currentGroup = item.ChartGroup;
//         }
//     }

//     for(i=0; i<chartTypes.length; i++){
//         item = chartTypes[i];
//         chartData = [];
//         let name = item.DataName;
//         for(let j=0; j<data.length;j++){
//             chartData.push(data[j].get(name));
//         }
//         item.dataValues.data = chartData;
//         res.chartData.push(item);
//     }
//     return res;
// }