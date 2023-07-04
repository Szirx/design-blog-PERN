const sequelize = require('../db')

const {DataTypes} = require('sequelize')

const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.STRING, defaultValue: "USER"},
})

const Post = sequelize.define('post', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false},
    img: {type: DataTypes.ARRAY(DataTypes.STRING), unique: true},
    theme_id: {type: DataTypes.INTEGER},
    description: {type: DataTypes.STRING(2500), unique: true} 
})

const Theme = sequelize.define('theme', {
    id: {type: DataTypes.INTEGER, primaryKey:true, autoIncrement: true},
    name: {type: DataTypes.STRING, unique: true, allowNull: false}
})

Theme.hasMany(Post, {
    foreignKey: 'theme_id',
    sourceKey: 'id'
})
Post.belongsTo(Theme, {
    foreignKey: 'theme_id',
    sourceKey: 'id'
})

module.exports = {
    User,
    Post,
    Theme
}