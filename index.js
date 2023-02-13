// const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();




// //MySQL
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'sample'
})




// //Posts
// //Read-get all users
app.get('/posts', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ${connection.threaded}')

        connection.query('SELECT * from posts', (err, rows) => {
            connection.release()

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })
    })
})


// //Read
app.get('/posts/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ${connection.threaded}')

        connection.query('SELECT * from posts WHERE ID = ? ', [req.params.id], (err, rows) => {
            connection.release()

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })
    })
})


// //create- add new row 
app.post('/posts', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        const postParams = req.body
        connection.query('INSERT INTO posts SET ?', postParams, (err, rows) => {
            connection.release()
            if(!err){
                res.send('Users  has been added.')
            }else{
                console.log(err)
            }
        })
        console.log(req.body)
    })
})


// //Delete
app.delete('/posts/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ${connection.threaded}')

        connection.query('Delete from posts WHERE ID = ? ', [req.params.id], (err, rows) => {
            connection.release()

            if(!err){
                res.send('Users with the Record Id: ${[req.params.id]} has been removed')
            }else{
                console.log(err)
            }
        })
    })
})


//update
app.put('/posts', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected')


        const {id, name, comment_status,users_id} = req.body

        connection.query('UPDATE posts SET name = ?, comment_status = ?,users_id = ? WHERE id = ?', [name, comment_status, users_id, id] , (err, rows) => {
            connection.release()

            if(!err){
                res.send('Users has been added.')
            }else{
                console.log(err)
            }
        })

        console.log(req.body)
    })
})



//const express = require('express');
//const bodyParser = require('body-parser');
// import users routes
const usersRoutes = require('./src/users-route');
//const postsRoutes = require('./src/posts-route')


// create express app
//const app = express();

// setup the server port
const port = process.env.PORT || 3000;

// parse request data content type application/x-www-form-rulencoded
app.use(bodyParser.urlencoded({extended: false}));

// parse request data content type application/json
app.use(bodyParser.json());

// define root route
app.get('/hello', (req, res)=>{
    res.send('Hello World');
});



// create users routes
app.use('/', usersRoutes);

// create posts routes
//app.use('/', postsRoutes);






// listen to the port
app.listen(port, ()=>{
    console.log(`Express is running at port ${port}`);
});

