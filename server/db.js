const {Sequelize} = require('sequelize')

module.exports = new Sequelize(
    'design_blog',
    'postgres',
    'password',
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        logging: false
    }
)