const Sequelize = require('sequelize');
const dbConfig = require('../config/database');
const Forum = require('../app/models/Forum');
const Api = require('../lib/Api');

const connection = new Sequelize(dbConfig);
Forum.init(connection);

module.exports = {

}