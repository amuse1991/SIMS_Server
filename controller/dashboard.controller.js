const db = require('../DB/db');
const satelliteModel = require('../DB/model/Satellite')(db.sequelize,db.Sequelize.DataTypes);
const Op = db.Sequelize.Op;

exports.getDashboardData = (req,res) => {
    
};
