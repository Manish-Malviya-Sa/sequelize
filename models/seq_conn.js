const { truncate } = require('fs/promises');
const { Sequelize,DataTypes,Op } = require('sequelize');
                            
                                // demo
const sequelize = new Sequelize('demo','Manish_Admin','Manish@123',{
    host: 'localhost',
    dialect:'mysql',
    logging: true, // true
    pool:{max:5,min:0,idel:10000}
});

sequelize.authenticate()
.then(()=> {
    console.log('connected');   
})
.catch(err => {
    console.log('error: ' + err.message);
})


const db = { };
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.employees = require('./employees')(sequelize,DataTypes);
db.posts = require('./posts')(sequelize,DataTypes);
db.tags = require('./tags')(sequelize,DataTypes);
db.post_tags = require('./post_tags')(sequelize,DataTypes);
db.videos = require('./videos')(sequelize,DataTypes);
db.images = require('./images')(sequelize,DataTypes);
db.comments = require('./comment')(sequelize,DataTypes);
db.tag_taggable = require('./tag_taggable')(sequelize,DataTypes);

// --------------------  Associations  Relationship

//----------- || Scopes || -----------------\\
db.employees.addScope('checkEmail',{
    where:{
        email:{
                [Op.like]:'%@gmail.com%'}
    }
});

db.employees.addScope('checkGender',{
    where:{
       gender:'male'
    }
});

db.employees.addScope('includePosts',{
   include:{
       model:db.posts,as:'postDetail',
       attributes:['title', 'content'],
   }
});

db.employees.addScope('selectEmp',{
    attributes:['name','email'],
 });

db.employees.addScope('limitCheck',{
    limit:2,
});

//----------- ||  One to One || -----------------\\
db.employees.hasOne(db.posts,{ foreignKey: 'emp_id', as:'postDetail'}); //  alias for posts as:'postDetail'        one to one

//----------- ||  One to Many || -----------------\\
db.employees.hasMany(db.posts,{ foreignKey: 'emp_id', as:'postInfo'}); //  alias for posts as:'postDetail'   one to many
db.posts.belongsTo(db.employees.scope('checkGender'),{ foreignKey: 'emp_id', as:'EmployeeInfo'}); //  alias for posts as:'postDetail'

//----------- ||  Many to Many || -----------------\\
db.posts.belongsToMany(db.tags,{through:'post_tags'});
db.tags.belongsToMany(db.posts,{through:'post_tags'}); 

//----------- ||  Polymorphic associations || -----------------\\
db.images.hasMany(db.comments,{
    foreignKey:'commentableId',
    constraint:false,
    scope:{
       commentableType:'image' 
    }
})

db.videos.hasMany(db.comments,{
    foreignKey:'commentableId',
    constraint:false,
    scope:{
       commentableType:'video' 
    }
})

db.comments.belongsTo(db.images,{
    foreignKey:'commentableId',
    constraint:false,
})

db.comments.belongsTo(db.videos,{
    foreignKey:'commentableId',
    constraint:false,
})

db.sequelize.sync({force:false})  // true drop table and create new table
.then(() =>{
    console.log('yes re-sync');
});

//----------- ||  Polymorphic associations Many to Many  || -----------------\\
   // ----- image to tag --------
db.images.belongsToMany(db.tags,{
    through:{
        model:db.tag_taggable,
        unique:false,
        scope:{
            taggableType:'image'
        }
    },
    foreignKey:'taggableId',
    constraints:false,
});

// ----- tag to image --------
db.tags.belongsToMany(db.images,{
    through:{
        model:db.tag_taggable,
        unique:false,
        scope:{
            taggableType:'image'
        }
    },
    foreignKey:'tagId',
    constraints:false,
});

// ----- video to tag --------
db.videos.belongsToMany(db.tags,{
    through:{
        model:db.tag_taggable,
        unique:false,
        scope:{
            taggableType:'video'
        }
    },
    foreignKey:'taggableId',
    constraints:false,
});

// ----- tag to video --------
db.tags.belongsToMany(db.videos,{
    through:{
        model:db.tag_taggable,
        unique:false,
        scope:{
            taggableType:'video'
        }
    },
    foreignKey:'tagId',
    constraints:false,
});

module.exports = db;