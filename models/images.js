module.exports = (sequelize,DataTypes)=>{
    const Images = sequelize.define("images",{
        title:{
            type: DataTypes.STRING,
        },
        url: {
            type: DataTypes.STRING,
        },       
    },{
         //tableName:'emp'     // change table name
        // timestamps:false,
        // createdAt:false,
        // updatedAt:false,
    });
    return Images;
};