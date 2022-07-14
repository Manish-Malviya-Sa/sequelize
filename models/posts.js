module.exports = (sequelize,DataTypes)=>{
    const Posts = sequelize.define("posts",{
        name: {
            type:DataTypes.STRING,
            // set(value){
            //     this.setDataValue('name',value+ 'malviya')
            // },
            // get(){
            //     return this.getDataValue('name')+' malviya';
            // }
        },

        title:{
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
        },
        emp_id: {
            type: DataTypes.INTEGER,
        }
       
    },{
        underscore: true,
        //tableName:'emp'     // change table name
        // timestamps:false,
        // createdAt:false,
        // updatedAt:false,
    });
    return Posts;
};