const db = require('./DB/db');
const WOD = require('./DB/model/WOD0')(db.sequelize,db.Sequelize.DataTypes);
const FCS = require('./DB/model/FCS')(db.sequelize,db.Sequelize.DataTypes); 
const TC = require('./DB/model/TC')(db.sequelize,db.Sequelize.DataTypes); 
const serverConfig = require('../configure/config').serverConfig;
//const moment = require('moment');
//소켓 작업
const dummyPort = serverConfig.dummyServerPort;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

let receivedDataFromSatellite = [];
//위성에서 WOD데이터가 수신되었다고 가정
WOD.findAll().then(wodData=>{
  receivedDataFromSatellite.push({dataType:'TM',dataName:'WOD',data:wodData})});

// //위성에서 FCS데이터가 수신되었다고 가정
// FCS.findAll().then(fcsData=>{
//   receivedDataFromSatellite.push({dataType:'TM',dataName:'FCS',data:fcsData});
// });

// // //위성에서 TC데이터가 수신되었다고 가정
// TC.findAll().then(tcData=>{
//   receivedDataFromSatellite.push({dataType:'TC',dataName:'TC',data:tcData});
//   io.emit('SELECT',{dataType:'TC',dataName:'TC'});
// });

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('connectionACK',socket.id); //SIMS Server에 연결 확인 메시지 전달
  socket.on('requestTM',(tmType)=>{
    console.log('requestTM')
    let tmData = receivedDataFromSatellite.find(element=>element.dataName===tmType).data;
    tmData.forEach((data,idx)=>{
      setTimeout(()=>{
        io.emit('respData',data);
      },idx*1000)
    });
  });
  // socket.on('requestTC',(tcType)=>{
  //   console.log('requestTC')
  //   setInterval(()=>{
  //     let tcData = receivedDataFromSatellite.find(element=>element.dataName===tcType).data
  //     io.emit('respData',tcData)
  //   })
  // })
})



  
//   //TM 데이터 요청 이벤트에 대한 이벤트 리스너
//   socket.on('request_telemetry',function(rtdType){
//     switch(rtdType){
//       //WOD 데이터 전달
//       case 'WOD':
//         WOD.findAll().then(wods=>{ //DB에서 WOD 데이터 가져오기
//           wods.forEach((data,idx)=>{
//             setTimeout(function(){ //초당 하나씩 데이터를 전달
//               io.emit('response_telemetry',data);
//             },idx*1000);
//           });
//         },()=>{
//           //TODO : DB에서 WOD 데이터 가져오지 못한 경우 null 반환
//           console.log('db connection failed');
//         });
//         break;
//       // FCS 데이터 전달
//       case 'FCS':
//         FCS.findAll().then(fcs=>{
//           fcs.forEach((data,idx)=>{
//             setTimeout(function(){
//               io.emit('response_telemetry',data);
//             },idx*1000);
//           });
//         },()=>{
//           //TODO : DB에서 FCS 데이터 가져오지 못한 경우 null 반환
//           console.log('db connection failed');
//         });
//         break;
//     }
//   });
//   //TC 데이터 요청 이벤트에 대한 이벤트 리스너
//   socket.on('request_telecommand',function(){

//   });
// });

http.listen(dummyPort, function(){
  console.log(`server listening on ${serverConfig.host}:${dummyPort}`);
});