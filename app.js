const express = require('express'); //express 클래스 import
const cors = require('cors'); //CORS 허용하기 위함
const apiApp = express(); // express 객체 생성(express 인스턴스가 하나의 서버 역할 수행)
const serverConfig = require('./configure/config').serverConfig;


//socket.io
//const socketApp = express();
//const http = require('http').Server(socketApp);
//const io = require('socket.io')(http);
//const ioClient = require('socket.io-client');
//const dummyHost = `http://${serverConfig.host}:${serverConfig.dummyServerPort}`;

const bodyParser = require('body-parser');
const apiPort = serverConfig.serverApiPort;
//const socketPort = serverConfig.RTDBroadcastPort;

/* app.get(url,요청 들어오면 실행할 함수)

    req : 요청을 보낸 클라이언트에 대한 정보를 가지는 객체
        req.param : url의 파라미터 정보
        req.query : url의 쿼리 정보
        req.body : post body 정보
    
    res : 응답 객체
        res.send()
        res.json()
        res.status()
*/

apiApp.use(cors());
apiApp.use(bodyParser.json());
apiApp.use(bodyParser.urlencoded({ extended: true }));

//   '/users'에 대한 요청은 ./api/user 미들웨어가 담당한다.
apiApp.use('/user', require('./api/users'));
apiApp.use('/satellite',require('./api/satellite'));
apiApp.use('/tc',require('./api/tc'));
apiApp.use('/tm',require('./api/tm'));
apiApp.use('/rtd', require('./api/rtd'));
apiApp.use('/gtd',require('./api/gtd'));



// app.listen(요청 대기할 port,서버 구동 완료되었을때 실행할 함수)
// api 서버
apiApp.listen(apiPort, () => {
  console.log(`SIMS-Server(api) listening on port ${apiPort}`);
});


//sims-client 와 소켓 통신하기 위한 소켓서버
// http.listen(socketPort, function(){
//     console.log(`SIMS-Server(socket) listening on ${serverConfig.host}:${socketPort}`);
//   });

// io.on('connection', function(socket){
//     console.log('a user connected');
//     //TM 데이터 요청 이벤트에 대한 이벤트 리스너
//     socket.on('request_telemetry',function(rtdType){
//         console.log(rtdType);
//         //dummy server에 연결
//         const clientSocket = ioClient(dummyHost);
//         clientSocket.on('connect', () => {
//             clientSocket.emit('request_telemetry',rtdType);
//         });
//         clientSocket.on('response_telemetry',(msg)=>{
//             console.log(msg);
//             io.emit('response_telemetry',msg)
//         });
//     });
  
//     socket.on('request_telecommand',function(){
  
//     });
    
// });