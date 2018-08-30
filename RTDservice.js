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

let dataset = {
    TM:[], // {dataName(WOD/FCS):string, data:[]}
    TC:[]
}

//관제 서버와 연결 셋업
const clientSocket = ioClient(dummyHost); //ioClient 생성하면 자동으로 dummyhost에 연결 요청을한다.
clientSocket.on('connectionACK',(myId)=>{
    console.log('dummy server send ACK, connection success. my socket ID is:'+myId); //연결 성공
    //데이터 수신 요청
    clientSocket.emit('requestTM','WOD'); 
    setTimeout(()=>{
        clientSocket.emit('requestTM','FCS');
    },10)
    setTimeout(()=>{
        clientSocket.emit('requestTC','TC');
    },10)

    
    //데이터가 수신되면 각 Room에 전달
    clientSocket.on('respWODData',(data)=>{
        console.log(data);
        setTimeout(()=>{
            TMnameSpace.to('WOD').emit('WODresp',data);
        },10);
    })
    clientSocket.on('respFCSData',(data)=>{
        console.log(data);
        setTimeout(()=>{
            TMnameSpace.to('FCS').emit('FCSresp',data);
        },10);
    })
    clientSocket.on('respTCData',(data)=>{
        console.log(data);
        setTimeout(()=>{
            TCnameSpace.to('TC').emit('TCresp',data);
        },10);
    })
    //클라이언트 연결 대기
    http.listen(socketPort, () => {
        console.log(`RTD sevice listening on ${serverConfig.host}:${socketPort}`);
        //TM
        TMnameSpace.on('connection',(socket)=>{ //클라이언트가 TM namespace 접속
            console.log('client conneted in TMnameSpace. client socket ID:'+socket.id);
            socket.on('requestTelemetry',(req)=>{ //Telemetry 요청
                console.log(`request telemetry is called. id:${req.id}, type:${req.type}`);
                socket.join(req.type,()=>{ // room(WOD,FCS)에 join
                    let rooms = Object.keys(socket.rooms);
                    console.log(rooms);
                });
            })
        })
        //TC
        TCnameSpace.on('connection',(socket)=>{ //TC namespace 접속
            console.log('client conneted in TCnameSpace. client socket ID:'+socket.id);
            socket.on('requestTelecommand',(req)=>{ //Telecommnad 요청
                console.log(`request telecommand is called. id:${req.id}, type:${req.type}`);
                socket.join(req.type,()=>{ // room(WOD,FCS)에 join
                    let rooms = Object.keys(socket.rooms);
                    console.log(rooms);
                });
            })
        })
    });
});

// clientSocket.on('respData',(data)=>{
//     console.log(data);
// })



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