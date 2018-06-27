
/*
    req_model =
        {
            satellite_name
        }
    
*/
// let users = [
//     {
//       id: 1,
//       name: 'alice'
//     },
//     {
//       id: 2,
//       name: 'bek'
//     },
//     {
//       id: 3,
//       name: 'chris'
//     }
//   ]
const io = require('socket.io-client');
const dummyHost = 'http://localhost:3003';

exports.connectionTest = (req,res)=>{
    console.log('connection test called');
    const socket = io('http://localhost:3003');
    socket.on('connect', () => {
        //console.log(socket.id); // 'G5p5...'
        console.log('connected')
        socket.emit('request_telemetry');
      });
    socket.on('response_telemetry',function(msg){
        console.log(msg)
    });
};

exports.disconnectionTest = (req,res)=>{
    //TODO: disconnect 구현
};

exports.getTelemetry = (req,res) => {
    console.log('get telemetry api called')
    //dummy server 연결
    socket.connect();
    const satelliteName = req.params.satelliteName
    //결과값 반환
}

exports.getTelecommand = (req,res) => {
    
}

// exports.index = (req, res) => {
//     return res.json(users);
// };

  
// exports.show = (req, res) => {
//     console.log(req.params.id); // 사용자가 입력한 :id 값이 출력됨. (주의: 클라이언트가 요청할때 서버로 오는 데이터는 전부 문자열 형식입니다. 기억하세요. )
    
//     //id값이 숫자인지 유효성 검사
//     const id = parseInt(req.params.id, 10); // parseInt 실패할 경우 NaN 반환
//     if (!id) { // NaN은 조건문에서 fasle와 같음
//         return res.status(400).json({error: 'Incorrect id'});
//     }

//     //id에 해당하는 유저 데이터 가져옴
//     let user = users.filter(user => user.id === id)[0]
//     if (!user) {
//       return res.status(404).json({error: 'Unknown user'});
//     }

//     return res.json(user);
// };
  
// exports.destroy = (req, res) => {
//     const id = parseInt(req.params.id, 10);
//     if (!id) {
//       return res.status(400).json({error: 'Incorrect id'});
//     }
  
//     const userIdx = users.findIndex(user => user.id === id);
//     if (userIdx === -1) {
//       return res.status(404).json({error: 'Unknown user'});
//     }
  
//     users.splice(userIdx, 1);
//     res.status(204).send();
// };
  
// exports.create = (req, res) => {
//     const name = req.body.name || ''; //req.body.name이 undefined 일 경우 ''를 넣음
//     if (!name.length) { // name을 입력하지 않은 경우(''인 경우)
//         return res.status(400).json({error: 'Incorrenct name'});
//     }
//     // 새로운 아이디 생성
//     const id = users.reduce((maxId, user) => {
//         return user.id > maxId ? user.id : maxId
//       }, 0) + 1;

//     // 유저 생성 및 배열에 유저 추가
//     const newUser = {
//         id: id,
//         name: name
//       };

//     users.push(newUser);

//     //응답
//     return res.status(201).json(newUser);
// };