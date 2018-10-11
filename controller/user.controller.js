const db = require('../DB/db');
const userModel = require('../DB/model/User')(db.sequelize,db.Sequelize.DataTypes);

exports.login = (req, res) => {
  let id = req.body.id;
  let pwd = req.body.pwd;
  userModel.findAndCountAll({
    attributes:['Id','Pwd'],
    where:{Id:id}
    })
    .bind(res)
    .then(result=>{
      if(result.count == 0){ //id가 존재하지 않는 경우
        return res.status(404).json({error:'unknown user'});
      }
      let userData = result.rows[0];
      if(userData.dataValues.Pwd !== pwd){ //pwd가 일치하지 않는 경우
        return res.status(404).json({error:'incorrect password'});
      }
      //정상 로그인
      return res.status(200).json(userData);
    })
};

exports.create = (req, res) => {
  let id = req.body.id;
  let pwd = req.body.pwd;
  let userName = req.body.userName;
  let dept = req.body.dept;
  let pos = req.body.pos;
  let mail = req.body.mail;
  let phone = req.body.phone;
  userModel.create({
    Id:id,
    Pwd:pwd,
    UserName:userName,
    Dept:dept,
    Position:pos,
    Email:mail,
    Phone:phone
  })
  .bind(res)
  .then(newUser=>{
    //아이디 정상 생성
    return res.status(200).json(newUser)
  },reason=>{
    //아이디 생성 실패
    return res.status(400).json(reason)
  })
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};
/*
exports.show = (req, res) => {
    console.log(req.params.id); // 사용자가 입력한 :id 값이 출력됨. (주의: 클라이언트가 요청할때 서버로 오는 데이터는 전부 문자열 형식입니다. 기억하세요. )
    
    //id값이 숫자인지 유효성 검사
    const id = parseInt(req.params.id, 10); // parseInt 실패할 경우 NaN 반환
    if (!id) { // NaN은 조건문에서 fasle와 같음
        return res.status(400).json({error: 'Incorrect id'});
    }

    //id에 해당하는 유저 데이터 가져옴
    let user = users.filter(user => user.id === id)[0]
    if (!user) {
      return res.status(404).json({error: 'Unknown user'});
    }

    return res.json(user);
};

exports.show = (req, res) => {
  userModel.findAll().then(users=>{
    console.log(users);
    return res.json(users)
  })
};

exports.destroy = (req, res) => {
    const id = parseInt(req.params.id, 10);
    if (!id) {
      return res.status(400).json({error: 'Incorrect id'});
    }
  
    const userIdx = users.findIndex(user => user.id === id);
    if (userIdx === -1) {
      return res.status(404).json({error: 'Unknown user'});
    }
  
    users.splice(userIdx, 1);
    res.status(204).send();
};
  
exports.create = (req, res) => {
    const name = req.body.name || ''; //req.body.name이 undefined 일 경우 ''를 넣음
    if (!name.length) { // name을 입력하지 않은 경우(''인 경우)
        return res.status(400).json({error: 'Incorrenct name'});
    }
    // 새로운 아이디 생성
    const id = users.reduce((maxId, user) => {
        return user.id > maxId ? user.id : maxId
      }, 0) + 1;

    // 유저 생성 및 배열에 유저 추가
    const newUser = {
        id: id,
        name: name
      };

    users.push(newUser);

    //응답
    return res.status(201).json(newUser);
};
*/