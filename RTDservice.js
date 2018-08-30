const express = require('express'); //express 클래스 import
const cors = require('cors'); //CORS 허용하기 위함
const serverConfig = require('./configure/config').serverConfig;
const bodyParser = require('body-parser');
const socketPort = serverConfig.RTDBroadcastPort;

const rtdServiceApp = express();
const http = require('http').Server(rtdServiceApp);
const io = require('socket.io')(http);
const ioClient = require('socket.io-client');
const dummyHost = `http://${serverConfig.host}:${serverConfig.dummyServerPort}`;

rtdServiceApp.use(cors());
rtdServiceApp.use(bodyParser.json());
rtdServiceApp.use(bodyParser.urlencoded({ extended: true }));

/*
io ==> SIMS client랑 소통(socket.io server)
clientSocket ==> 관제 서버(dummy server)와 소통(socket.io client)
*/

//네임스페이스 생성(TM/TC)
let TMnameSpace = io.of('/TMnameSpace');
let TCnameSpace = io.of('/TCnameSpace');
let waitingSpace = io.of('/waitingSpace')
let waiting = [];

let dataset = {
    TM:[], // {dataName(WOD/FCS):string, data:[]}
    TC:[]
}

//관제 서버와 연결 셋업
const clientSocket = ioClient(dummyHost); //ioClient 생성하면 자동으로 dummyhost에 연결 요청을한다.
clientSocket.on('connectionACK',(myId)=>{
    console.log('dummy server send ACK, connection success. my socket ID is:'+myId); //연결 성공
    //clientSocket.emit('requestTM','WOD');
    //클라이언트 연결 대기
    http.listen(socketPort, () => {
        console.log(`RTD sevice listening on ${serverConfig.host}:${socketPort}`);
        waitingSpace.on('connection',(socket)=>{ //사용자 접속
            console.log('client conneted in waiting nameSpace. client socket ID:'+socket.id);
            waiting.push(socket.id);
            socket.on('requestTelemetry',(req)=>{
                console.log(`request telemetry is called. id:${req.id}, type:${req.type}`);
            })
        })
        TMnameSpace.on('connection',(socket)=>{ //TM namespace 접속
            console.log('client conneted in TMnameSpace. client socket ID:'+socket.id);
        })
        TCnameSpace.on('connection',(socket)=>{ //TC namespace 접속
            console.log('client conneted in TCnameSpace. client socket ID:'+socket.id);
        })
    });
});

clientSocket.on('respData',(data)=>{
    console.log(data);
})



//관제 서버에서 데이터 수신
// clientSocket.on('dataReceivedFromSat',(config)=>{ //관제 서버에서 위성 데이터 수신했음을 알리는 이벤트를 발생시킨 경우
//     //데이터 수신 이전 셋업
//     console.log('dataReceivedFromSat');
//     const {dataType,dataName} = config;
//     dataType==='TM'||dataType==='TC'?dataset[dataType].push({dataName:dataName}):console.log("error:invalid data type");
    
//     clientSocket.on('sendSatelliteData',(data)=>{ //데이터 수신
//         console.log(data);
//         let dataIdx = dataset[dataType].findIndex(element=>element.dataName===dataName);
//         dataset[dataType][dataIdx].data.push(data);
//         });
//     })
// io.on('connection', function(socket){
//     console.log('a user connected');
//     //TM 데이터 요청 이벤트에 대한 이벤트 리스너
//     socket.on('request_telemetry',function(rtdType){
//         console.log(rtdType);
//         //dummy server에 연결
//         const clientSocket = ioClient(dummyHost);
//         clientSocket.on('connect', () => { //연결 요청
//             clientSocket.emit('request_telemetry',rtdType); //데이터 요청
//         });
//         //dummy srver에서 응답 받은 경우
//         clientSocket.on('response_telemetry',(msg)=>{
//             console.log(msg);
//             //client로 응답 보냄
//             io.emit('response_telemetry',msg)
//         });
//     });
  
//     socket.on('request_telecommand',function(){
  
//     });
    
// });