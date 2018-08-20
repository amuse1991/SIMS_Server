const databaseConfig = require('../configure/config').databaseConfig;
const Sequelize = require('sequelize');
var db = {};

//연결 설정
var sequelize = new Sequelize(
    databaseConfig.dbName, 
    databaseConfig.userName,
    databaseConfig.password,
    databaseConfig.config
  );

//연결 테스트
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;