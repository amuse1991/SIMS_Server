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
  receivedDataFromSatellite.push({dataType:'TM',dataName:'WOD',data:wodData})}
);

//위성에서 FCS데이터가 수신되었다고 가정
FCS.findAll().then(fcsData=>{
  receivedDataFromSatellite.push({dataType:'TM',dataName:'FCS',data:fcsData});
});

//위성에서 TC데이터가 수신되었다고 가정
TC.findAll().then(tcData=>{
  receivedDataFromSatellite.push({dataType:'TC',dataName:'TC',data:tcData});
  io.emit('SELECT',{dataType:'TC',dataName:'TC'});
});

io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('connectionACK',socket.id); //SIMS Server에 연결 확인 메시지 전달
  //TM
  socket.on('requestTM',(tmType)=>{
    console.log('requestTM')
    let tmData = receivedDataFromSatellite.find(element=>element.dataName===tmType).data;
    tmData.forEach((data,idx)=>{
      setTimeout(()=>{
        io.emit(`resp${tmType}Data`,data);
      },idx*1000)
    });
  });
  
  //TC
  socket.on('requestTC',(tcType)=>{
    console.log('requestTC')
    let tcData = receivedDataFromSatellite.find(element=>element.dataName===tcType).data;
    tcData.forEach((data,idx)=>{
      setTimeout(()=>{
        io.emit(`resp${tcType}Data`,data);
      },idx*1000)
    });
  });
})


http.listen(dummyPort, function(){
  console.log(`server listening on ${serverConfig.host}:${dummyPort}`);
});