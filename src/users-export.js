
var UserModel = require('./users.js');

// get all users list
exports.getUsersList = (req, res)=> {
    //console.log('here all users list');
    UserModel.getAllUsers((err, users) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Users', users);
        res.send(users)
    })
}

// get users by ID
exports.getUsersByID = (req, res)=>{
    //console.log('get emp by id');
    UserModel.getUsersByID(req.params.id, (err, users)=>{
        if(err)
        res.send(err);
        console.log('single user data',users);
        res.send(users);
    })
}

// create new users
exports.createNewUsers = (req, res) =>{
    const usersReqData = new UserModel(req.body);
    console.log('usersReqData', usersReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        UserModel.createUsers(usersReqData, (err, users)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Users Created Successfully', data: users.insertId})
        })
    }
}

// update users
exports.updateUsers = (req, res)=>{
    const usersReqData = new UserModel(req.body);
    console.log('usersReqData update', usersReqData);
    // check null
    if(req.body.constructor === Object && Object.keys(req.body).length === 0){
        res.send(400).send({success: false, message: 'Please fill all fields'});
    }else{
        UserModel.updateUsers(req.params.id, usersReqData, (err, users)=>{
            if(err)
            res.send(err);
            res.json({status: true, message: 'Users updated Successfully'})
        })
    }
}

// delete users
exports.deleteUsers = (req, res)=>{
    UserModel.deleteUsers(req.params.id, (err, users)=>{
        if(err)
        res.send(err);
        res.json({success:true, message: 'Users deleted successully!'});
    })
}