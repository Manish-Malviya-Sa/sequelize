module.exports = (sequelize,DataTypes)=>{
    const Comments = sequelize.define("comments",{
        title:{
            type: DataTypes.STRING,
        },
        commentableId:{
            type: DataTypes.INTEGER,
        }, 
        commentableType:{
            type: DataTypes.STRING,
        },      
    },{
         //tableName:'emp'     // change table name
        // timestamps:false,
        // createdAt:false,
        // updatedAt:false,
    });
    return Comments;
};