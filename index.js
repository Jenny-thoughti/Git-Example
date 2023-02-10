const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

//Task 1
app.get('/hello',(req, ress) => {
    ress.send('Hello World!');
})

app.listen(port, () => {
    console.log('App Listening on port', port)
})

//MySQL
const pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'sample'
})

//Users
//Read-get all users
app.get('/users', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ${connection.threaded}')

        connection.query('SELECT * from users', (err, rows) => {
            connection.release()

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })
    })
})


//Read-get a users by id
app.get('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ${connection.threaded}')

        connection.query('SELECT * from users WHERE ID = ? ', [req.params.id], (err, rows) => {
            connection.release()

            if(!err){
                res.send(rows)
            }else{
                console.log(err)
            }
        })
    })
})

//DELETE users
app.delete('/:id', (req, res) => {
    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ${connection.threaded}')

        connection.query('Delete from users WHERE ID = ? ', [req.params.id], (err, rows) => {
            connection.release()

            if(!err){
                res.send('Users with the Record Id: ${[req.params.id]} has been removed')
            }else{
                console.log(err)
            }
        })
    })
})


//Create-Add a users Records 
app.post('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ${connection.threadId}')

        const params = req.body

        connection.query('INSERT INTO users SET ?', params, (err, rows) => {
            connection.release()

            if(!err){
                res.send('Users with the name: ${params.name} has been added.')
            }else{
                console.log(err)
            }
        })

        console.log(req.body)
    })
})

//Update
app.put('', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ${connection.threadId}')

        
        const {id, name, qualification, profile} = req.body

        connection.query('UPDATE users SET name = ?, qualification = ?, profile = ? WHERE id = ?', [name, qualification,profile, id] , (err, rows) => {
            connection.release()

            if(!err){
                res.send('Users with the name : ${name} has been added.')
            }else{
                console.log(err)
            }
        })

        console.log(req.body)
    })
})






//Posts
//Read-get all users
app.get('', (req, res) => {
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


//Read
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


//create- add new row 
app.post('/posts', (req, res) => {

    pool.getConnection((err, connection) => {
        if(err) throw err
        console.log('connected as id ${connection.threadId}')

        const postParams = req.body

        connection.query('INSERT INTO posts SET ?', postParams, (err, rows) => {
            connection.release()

            if(!err){
                res.send('Users with the name: ${postParams.name} has been added.')
            }else{
                console.log(err)
            }
        })

        console.log(req.body)
    })
})


//Delete
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
        console.log('connected as id ${connection.threadId}')

        
        const {id, name, comment_status} = req.body

        connection.query('UPDATE posts SET name = ?, comment_status = ? WHERE id = ?', [name, comment_status, id] , (err, rows) => {
            connection.release()

            if(!err){
                res.send('Users with the name : ${name} has been added.')
            }else{
                console.log(err)
            }
        })

        console.log(req.body)
    })
})



