var UserModel = require('../users.js'); 


// TODO: @jenny complete this file
const UserController = {
    getAllUsers: (req, res) => {
        return res.status(200).send({
            count: 5,
            rows: [{}, {}],
        });
    },

    //list of users
    getUsersList: (req, res)=> {
        //console.log('here all users list');
        UserModel.getAllUsers((err, users) =>{
            console.log('We are here');
            if(err)
            res.send(err);
            console.log('Users', users);
            res.send(users)
        })
    },

    //users with id
    getUsersByID : (req, res)=>{
        //console.log('get emp by id');
        UserModel.getUsersByID(req.params.id, (err, users)=>{
            if(err)
            res.send(err);
            if(users.length <= 0)
            return res.status(404).send({error: 'User not found' });
        
            console.log('single user data',users);
            res.send(users);
        
            
        })
    },

    // getUsersByID : (req, res) => {
    //     UserModel.findById(req.params.userId).then((result) => {
    //         res.status(200).send(result);
    //     });
    //  },

    //create new users
    createNewUsers : (req, res) =>{
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
    },

    //update users
    updateUsers: (req, res)=>{
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
    },

    //Delete users
    deleteUsers:(req, res)=>{
        UserModel.deleteUsers(req.params.id, (err, users)=>{
            if(err)
            res.send(err);
            res.json({success:true, message: 'Users deleted successully!'});
        })
    }

};

module.exports = UserController;
