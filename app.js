const express = require('express'); //express 클래스 import
const app = express(); // express 객체 생성(express 인스턴스가 하나의 서버 역할 수행)
const bodyParser = require('body-parser');
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


//   '/users'에 대한 요청은 ./api/user 미들웨어가 담당한다.
app.use('/users', require('./api/users'));
app.use('/rtd', require('./api/rtd'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


 // app.listen(요청 대기할 port,서버 구동 완료되었을때 실행할 함수)
app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});