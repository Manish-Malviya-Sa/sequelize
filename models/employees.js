module.exports = (sequelize,DataTypes)=>{
    const Employees = sequelize.define("employees",{
        name: {
            type:DataTypes.STRING,
            // set(value){
            //     this.setDataValue('name',value+ 'malviya')
            // },
            // get(){	
            //     return this.getDataValue('name')+' malviya';
            // }
        },

        email:{
            type: DataTypes.STRING,
            //defaultValue:'test@gmail.com',
            allowNull: false,    // constraints
            unique: true
        },
        gender: {
            type: DataTypes.STRING,
            validate: // { equals:"male" },
            { isIn:[['male','female']] }
        }
       
    },{
         //tableName:'emp'     // change table name
        // timestamps:false,
        // createdAt:false,
        // updatedAt:false,
            // hooks:{
            //     beforeValidate:(employees,options) => {
            //         // console.log("hooks");
            //         employees.name = 'hooks test data';
            //     },
            //     afterValidate:(employees,options) => {
            //         // console.log("hooks");
            //         employees.name = 'kamlesh';
            //     }
            // }
    });

     Employees.addHook('beforeValidate','customeName',(employees,options) => {
        employees.name = 'new hooks';
     })
    
     Employees.afterValidate('myHookLast',(employees,options) => {
        employees.name = 'new hooks after';
     })
    return Employees;
};