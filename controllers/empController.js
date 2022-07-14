const db =  require('../models/seq_conn');
const Employees = db.employees;
const Posts = db.posts;
const Tags = db.tags;
const Post_tags = db.post_tags;
const Videos = db.videos;
const Images = db.images;
const Comments = db.comments;
const Tag_Taggable = db.tag_taggable;
const { sequelize, QueryTypes, Op ,transaction } = require('sequelize');
const { Sequelize } = require('../models/seq_conn');
const { count } = require('console');
const { measureMemory } = require('vm');


var addEmployee = async(req, res) => {
    
    //  build
   const employees = await Employees.build({ name:"manish",email:"manish@gmail.com",gender:"male" });

    // create
    // const employees = await Employees.create({ name:"tanish",email:"tanish@gmail.com",gender:"male" });
    
    // Update
    // employees.name = "Manish Malviya"

    // Delete
    // employees.destroy();

     employees.save()
       .then(() => {
        console.log('new employees saved');
        const response = {  
                    data:"ok"
                }
                res.status(200).json(response)  
    }).finally(() => {
        sequelize.close();
    })
}

var crudOperation = async(req, res) => {

    // Insert 
    // const employees = await Employees.create({ name:"ankita",email:"ankita@gmail.com",gender:"female" });
    // console.log(employees.dataValues.id);

    // Update
    //const employees = await Employees.update({ name:"rashmi",email:"rashmi@gmail.com"},{ where: { id:2 }});


    // delete
    //const employees = await Employees.destroy({ where: { id:2 }})

    // truncate delete all records in table
    // const employees = await Employees.destroy({ truncate: true });

    // Bulk Insert
    const employees = await Employees.bulkCreate([
        { name:"maniya",email:"maniya@gmail.com",gender:"male" },
        { name:"sanju",email:"sanju@gmail.com",gender:"male" },
        { name:"shiv",email:"shiv@gmail.com",gender:"male" },
        { name:"ketu",email:"ketu@gmail.com",gender:"male" }
    ]);

    // Find all
    //const employees = await Employees.findAll({ });

    // Find One
    // const employees = await Employees.findOne({ });


    const response = {  
        data:employees
    }
    res.status(200).json(response)

}

    // const response = {  
    //     data:"ok"
    // }
    // res.status(200).json(response)  

var queryOperation = async (req, res) => {
    // only given fields data are inserted in db
    // const employees = await Employees.create({ name:"ankita",email:"ankita@gmail.com",gender:"female" },{
    //     fields:['email']
    // });


    // Select 
    // const employees = await Employees.findAll({
    //     attributes:[
    //     'name',
    //     ['email','emailId'],
    //     'gender',
    //     [Sequelize.fn('CONCAT',Sequelize.col('email'),'ID'),'emailCount']
    // ], 
    // })

    // include - exclude
    const employees = await Employees.findAll({
            attributes:{
                exclude:['createdAt','updatedAt'],
                include:[
                    [Sequelize.fn('CONCAT',Sequelize.col('email'),'ID'),'emailCount']
                ]
            }
        })
        const response = {  
            data:employees
        }
        res.status(200).json(response)  


    //    condition
    // const employees = await Employees.findAll({
    // where : {
    //     // id : 5,
    //     //    id:{
    //     //        [Op.eq]:2
    //     //    },
    //     email:{
    //         [Op.like]:'%@gmail.com%'
    //     },
    //     gender: {
    //         [Op.startsWith]:'male'
    //     }
    // },
    // order:[
    //         ['name','ASC']
    //     ],
    //     // group: ['name'],
    //     limit:2,
    //     offset:1,

    //     });
    
    // count
    // const employees = await Employees.count({ })

        // const response = {  

            
        //     data:employees
        // }
        // res.status(200).json(response)  
}

var finderData = async(req, res) => {
   
    // FindAll
    // const employees = await Employees.findAll({ })

    // findOne
    // const employees = await Employees.findAll({ where: { id:5 }})

    // Find by pk 
    //const employees = await Employees.findByPk(3);

    // Find and count All
    // const employees = await Employees.findAndCountAll({ where: {
    //     email:"sanju@gmail.com"
    // }})

    // Find and Create
    const [employees,created] = await Employees.findOrCreate({
         where: {name:"demo1"},
         defaults: {
              email: "demo@gmail.com",
              gender:"male" 
            }
    });

    const response = {         
        data:employees,
        add:created
    }
    res.status(200).json(response)  

}

var setter_getter = async(req, res) => {
    
    // Set
    //const employees = await Employees.create({name:"punit",email:"punit@gmail.com",gender:"male" })
 
    // Get
    const employees = await Employees.findAll({ });

    const response = {         
        data:employees,
    }
    res.status(200).json(response)  

}

var validations = async(req, res) => {

    try{
        
        const employees = await Employees.create({name:"sanju",email:"sanju@gmail.com",gender:"male" })
        const response = {         
            data:employees,
        }
        res.status(200).json(response) 

    }catch(err){
        const messages = {};
        console.log(err);
        err.errors.forEach((error)=>{
            let message;
            switch(error.validatorKey) {
                case 'not_unique':
                    message = 'Duplicate Email';
                    break;

                case 'isIn':
                    message = 'Gender not in Male / Female';
                    break;
            }
            message = error.message;
            messages[error.path] = message;
            console.log(message);
        });
    }
}

var rawQuery = async(req, res) => {

    const employees = await db.sequelize.query("Select * from employees where gender = $gender ",{
        type: QueryTypes.SELECT,
        // model.employees,
        // mapToModel: true,
        // raw: true,
        // replacements:{gender:"male"} //  gender =:gender
        // replacements:['male'] // gender = ?
        // replacements: { gender:['male','female']} // gender IN(:gender)
        // replacements: {searchEmail: '%@gmail.com'} // email LIKE :searchEmail

        bind:{gender:'male'}
    })
    const response = {         
        data:employees  ,
    }
    res.status(200).json(response) 

}

//   associations

var oneToOne = async(req, res) => {   // ---------- hasOne ------------  Employees to Posts
    
    // const posts = await Posts.create({ name:"creater",title:"creater",content:"creater",emp_id:"8"});
 
    // const posts = await Posts.create({name:"demo",title:"demo",content:"demo",emp_id:"10"})

    const employees = await Employees.findAll({ 
        attributes:['name', 'email'],
        //include:Posts,
        include:[{
            model:Posts,
            as:'postDetail',
            attributes:['title',['name','PostName']]
        }],
        where:{ id:8 }
    })
    const response = {         
       // data:posts,
       hasOne:employees,
    }
    res.status(200).json(response) 
}

var belongsTo = async(req, res) => {  // ---------- belongsTo ------------ Posts to Employees
    
    const posts = await Posts.findAll({
        attributes:['content', 'title'],
        //include:Posts,
        include:[{
            model:Employees,
            as:'EmployeeInfo',
            attributes:['name','email']
        }],
    })
    const response = {
        belongsTo:posts,
    }
    res.status(200).json(response)
}

var hasMany = async(req, res) => {  // ---------- hasMany ------------ one to many

    // const posts = await Posts.create({name:"creater1",title:"creater1",content:"creater1",emp_id:"10"})

    const employees = await Employees.findAll({ 
        attributes:['name', 'email'],
        //include:Posts,
        include:[{
            model:Posts,
            as:'postDetail',
            attributes:['title',['name','PostName']]
        }],
        where:{ id:10 }
    })
    const response = {
        hasMany:employees,
    }
    res.status(200).json(response)
}

var manyToMany = async(req, res) => {

    // const tags = await Tags.bulkCreate([{name:"t1"},{name:"t2"},{name:"t3"}]);

    // const post_tags = await Post_tags.bulkCreate([{postId:"1",tagId:"1"},{postId:"3",tagId:"2"},{postId:"6",tagId:"2"}]);

    // ---------- Posts ot Tags ------------- \\
    // const data = await Posts.findAll({
    //     attributes:['title', 'content'],
    //     include: [{
    //         model:Tags,
    //         attributes:['name'],
    //     }]
    // })

    // ---------- Tags ot Posts ------------- \\
    const data = await Tags.findAll({
        attributes:['name'],
        include: [{
            model:Posts,
            attributes:['title', 'content'],
        }]
    })
    const response = {
        hasMany:data,
    }
    res.status(200).json(response)
}

var scopes = async(req, res) => {

    //const data = await Employees.scope(['checkEmail','checkGender']).findAll({});

    // const data = await Posts.findAll({
    //     include:[{
    //         model: Employees,as:'EmployeeInfo'
    //     }]
    // })

    const data = await Employees.scope(['includePosts','selectEmp','limitCheck']).findAll({});

    const response = {
        scopes:data,
    }
    res.status(200).json(response)

}

var Polymorphic_Associations = async(req, res) => {
    //  ------- Images 2 Comments
    const data = await Images.findAll({
        include: [
            { model:Comments }
        ]
    })

    //  ------- Videos 2 Comments
    const data1 = await Videos.findAll({
        include: [
            { model:Comments }
        ]
    })

    // ---- Comments to videos / Images
    const data2 = await Comments.findAll({
       // include:[Images]
        include:[Images,Videos]
    })

    const response = {
        Polymorphic_Associations:data2,
    }
    res.status(200).json(response)
}

var Polymorphic_m2m = async(req, res) => {
    
    //  images to tags
    const data = await Images.findAll({
        include:[Tags]
    })

    //  images to tags
    const data1 = await Videos.findAll({
        include:[Tags]
    })

    //  tags to Images / Videos
    const data2 = await Tags.findAll({
        include:[Videos,Images]
    })

    const response = {
        Polymorphic_Many_2_Many:data2,
    }
    res.status(200).json(response)

}

var loading = async(req, res) => {
    //  ------- Lazy loadind
    // const data = await Employees.findOne({ where: { id:8 } })
    // const postData = await data.getPosts({});
    // const response = {
    //     loading:data,
    //     posts:postData,
    // }
    // res.status(200).json(response);

    //  ------- Eager loadind
    const data1 = await Employees.findOne({ 
        include:[{ model:Posts,as:'postDetail' }],
        where: { id:8 }
     })
    const response = {
        loading:data1,
    }
    res.status(200).json(response)
}

var paranoid = async(req, res) => {
   // const videos = await Videos.findAll({})

    // const videos = await Videos.destroy({
    //     where: { id:5 }
    // })

    //  -------- Soft Deleted Data show -------
    // const videos = await Videos.findAll({ paranoid:false })

    // const response = {
    //     loading:videos,
    // }
    // res.status(200).json(response)

    //  ------------ Restore Soft deleted data ------
    const videos = await Videos.restore({  where: { id:5 } })

    const response = {
        loading:videos,
    }
    res.status(200).json(response)
}

var transactions =  async (req,res) => {

    const t = await sequelize.transaction();

    try{
        const employees = await Employees.create({ name:"kamu",email:"kamu@gmail.com",gender:"male"},{
            transaction:t
        });
        console.log("commit");
        t.commit();

        // const response = {
        //     loading:employees,
        // }
        
    }
    catch(err){
        console.log("rollback")
        t.rollback();
        console.log(err);
    }
    res.status(200).json('ok');
}

var hooks = async(req, res) => {
    const employees = await Employees.create({ name:"kamu1",email:"kamu12@gmail.com",gender:"male"});

    // const employees =  await Employees.findAll({ 
    //     include:[{
    //         model:Posts,
    //         as:'postDetail',
    //     }],
    //     where:{ gender:'male' }
        
    // })
    const response = {
        loading:employees,
    }
    res.status(200).json(response)
}

//const queryInterface = sequelize.getQueryInterface();
    var queryInterfaceData = async (req, res)=>{
    
    //  --------- create table
    queryInterface.createTable('avon',{
        name: DataType.String,
    });

    //  --------- column add
    queryInterface.addColumn('avon','email',{
        type: DataType.String,
    });

    //  --------- Alter table
    queryInterface.changeColumn('avon',{
        type: DataType.String,
        defaultValue: 'test@gmail.com'
    });

    // ---- Column delete
    queryInterface.removeColumn('avon','email');

    // -------   Drop table
    queryInterface.dropTable('avon');

    //  --------  Drop Database
    queryInterface.dropDatabase('manu123')

    let data = 'Query Interface'
    res.status(200).json(data)
}

module.exports = {
    addEmployee,crudOperation,queryOperation,finderData,setter_getter,validations,rawQuery,oneToOne,
    belongsTo,hasMany,manyToMany,scopes,Polymorphic_Associations,Polymorphic_m2m,loading,paranoid,
    transactions,hooks,queryInterfaceData,
}
