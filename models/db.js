const Sequelize = require('sequelize');

// Conexão com o DataBase MySQL
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
});

// console.log(process.env.DB_NAME);
// console.log(process.env.DB_USER);
// console.log(process.env.DB_PASS);
// console.log(process.env.DB_HOST);


module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
