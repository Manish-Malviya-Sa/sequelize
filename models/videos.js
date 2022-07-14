module.exports = (sequelize,DataTypes)=>{
    const Videos = sequelize.define("videos",{
        title:{
            type: DataTypes.STRING,
        },
        text: {
            type: DataTypes.STRING,
        },       
    },{
        paranoid:true,
        deletedAt:'softDelete',
        //tableName:'emp'     // change table name
        // timestamps:false,
        // createdAt:false,
        // updatedAt:false,
    });
    return Videos;
};