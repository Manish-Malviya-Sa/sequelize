module.exports = (sequelize,DataTypes)=>{
    const Tag_Taggable = sequelize.define("tag_taggable",{
        tagId: {
            type: DataTypes.INTEGER,
            unique: 'tt_unique_constraint'
          },
          taggableId: {
            type: DataTypes.INTEGER,
            unique: 'tt_unique_constraint',
            references: null
          },
          taggableType: {
            type: DataTypes.STRING,
            unique: 'tt_unique_constraint'
          }

    });
    return Tag_Taggable;
}


  
