console.log("config loadded...")
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({
    path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
});

module.exports = {
    NODE_ENV : process.env.NODE_ENV || 'development',
    HOST : process.env.HOST || 'localhost',
    PORT : process.env.PORT || 3002,
    DB_URL: process.env.DB_URL || 'mongodb+srv://root:root@cluster0.9ydkd31.mongodb.net/cricfusion',
    JWT_SECRET: process.env.JWT_SECRET || 'ankit',
    BASE_URL: process.env.BASE_URL || 'http://localhost:3002'
}