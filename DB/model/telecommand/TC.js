'use strict';
module.exports = (sequelize, DataTypes) => {
  var TC = sequelize.define('TC', 
    {
        No:{type:DataTypes.INTEGER,primaryKey:true},
        Dest_Task_ID:{ type:DataTypes.INTEGER},
        Src_Task_ID:{ type:DataTypes.INTEGER},
        OBC_Pkt_Type:{ type:DataTypes.STRING},
        OBC_Reply_Type:{ type:DataTypes.STRING},
        App_Length:{ type:DataTypes.INTEGER},
        Frame_Type:{ type:DataTypes.STRING},
        Virtual_Ch:{ type:DataTypes.INTEGER},
        Frame_Len:{ type:DataTypes.INTEGER},
        Frame_Seq_No:{ type:DataTypes.INTEGER},
        MAPID:{ type:DataTypes.STRING},
        LAC_Signature:{ type:DataTypes.INTEGER},
        PKT_Seq_No:{ type:DataTypes.STRING},
        Data:{ type:DataTypes.STRING}
    },
    {
        tableName: 'TC',
        timestamps: false,
        freezeTableName: true
    });
  return TC;
};
