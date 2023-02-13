require('dotenv').config()
const mysql = require('mysql');


//SQL
const dbConn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
     password: '',
    database: 'sample'  
})

dbConn.connect(function(error){
    if(error) throw error;
    console.log('Database Connected Successfully!!!');
})

module.exports = dbConn;