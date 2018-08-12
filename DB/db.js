const Sequelize = require('sequelize');
var db = {};

//연결 설정
var sequelize = new Sequelize(
    'SIMS', //db name
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
    }
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

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;