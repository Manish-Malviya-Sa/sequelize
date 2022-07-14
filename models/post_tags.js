module.exports = (sequelize,DataTypes)=>{
    const Post_Tags = sequelize.define("post_tags",{ 
        postId:DataTypes.INTEGER,
        tagId:DataTypes.INTEGER,
    },
    { 
        paranoid:true,
        deletedAt:'softDelete',
    });
    return Post_Tags;
}