//DB연동
const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    'simsdb', //db name
    'sa', //username
    '01062581441', //password
    {
    host: 'simsdb.canbesucadip.ap-northeast-2.rds.amazonaws.com',
    dialect: 'mssql',
    operatorsAliases: false,

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
  // SQLite only
  //storage: 'path/to/database.sqlite'
});

//연결 테스트
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



//소켓 작업
const dummyPort = 3001;
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(dummyPort, function(){
  console.log(`server listening on localhost:${dummyPort}`);
});