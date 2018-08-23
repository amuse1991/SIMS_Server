exports.databaseConfig = {
    userName:'sa',
    password:'01062581441',
    dbName:'SIMS',
    config:{
        host: 'simsdb.canbesucadip.ap-northeast-2.rds.amazonaws.com',
        dialect: 'mssql',
        operatorsAliases: false,
    
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
}

exports.serverConfig = {
    host: 'localhost',
    clientPort:3000,
    RTDBroadcastPort:3001,
    serverApiPort:3002,
    dummyServerPort:3003
}