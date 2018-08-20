const db = require('./DB/db');
const WOD = require('./DB/model/WOD0')(db.sequelize,db.Sequelize.DataTypes);
const FCS = require('./DB/model/FCS')(db.sequelize,db.Sequelize.DataTypes); 

//소켓 작업
const dummyPort = 3003;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
  //TM 데이터 요청 이벤트에 대한 이벤트 리스너
  socket.on('request_telemetry',function(rtdType){
    switch(rtdType){
      //WOD 데이터 전달
      case 'WOD':
        WOD.findAll().then(wods=>{ //DB에서 WOD 데이터 가져오기
          wods.forEach((data,idx)=>{
            setTimeout(function(){ //초당 하나씩 데이터를 전달
              io.emit('response_telemetry',data);
            },idx*1000);
          });
        },()=>{
          //TODO : DB에서 WOD 데이터 가져오지 못한 경우 null 반환
          console.log('db connection failed');
        });
        break;
      // FCS 데이터 전달
      case 'FCS':
        FCS.findAll().then(fcs=>{
          fcs.forEach((data,idx)=>{
            setTimeout(function(){
              io.emit('response_telemetry',data);
            },idx*1000);
          });
        },()=>{
          //TODO : DB에서 FCS 데이터 가져오지 못한 경우 null 반환
          console.log('db connection failed');
        });
        break;
    }
  });
  //TC 데이터 요청 이벤트에 대한 이벤트 리스너
  socket.on('request_telecommand',function(){

  });
});

http.listen(dummyPort, function(){
  console.log(`server listening on localhost:${dummyPort}`);
});