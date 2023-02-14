var dbConn  = require('../config');

var Users = function(users){
    this.name      =   users.name;
    this.qualification  =   users.qualification;
    this.profile        =   users.profile;
}

// get all users
Users.getAllUsers = (result) =>{
    dbConn.query('SELECT * FROM users ', (err, res)=>{
        if(err){
            console.log('Error while fetching users', err);
            result(null,err);
        }else{
            console.log('Users fetched successfully');
            result(null,res);
        }
    })
}

// get users by ID from DB
Users.getUsersByID = (id, result)=>{
    dbConn.query('SELECT * FROM users WHERE id=?', id, (err, res)=>{
        if(err){
            console.log(err);
            console.log('Error while fetching users by id', err);
            result.status(400)
        }else{
            result(null, res);
        };
       
    })
}

// Users.getUsersByID = (id, response)=>{
//     dbConn.query('SELECT * FROM users WHERE id = ?', [id], (error, results)=>{
//         if(){
//            throw error
//         }
//         response(results)
      
//     })
// }


// Users.getUsersByID = (request, response) => {
//     const id = parseInt(request.params.id)
  
//     dbConn.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
//       if (error) {
//         throw error
//       }
//       response.status(200).json(results.rows)
//     })
//   }

// Users.getUsersByID = (id) => {
//     return User.findById(id).then((result) => {
//         result = result.toJSON();
//         return result;
//     });
// };



// create new users
Users.createUsers = (usersReqData, result) =>{
    dbConn.query('INSERT INTO users SET ? ', usersReqData, (err, res)=>{
        if(err){
            console.log('Error while inserting data');
            result(null, err);
        }else{
            console.log('users created successfully');
            result(null, res)
        }
    })
}

// update users
Users.updateUsers = (id, usersReqData, result)=>{
    dbConn.query("UPDATE users SET name=?, qualification=?, profile=? WHERE id = ?", 
    [usersReqData.name, usersReqData.qualification, usersReqData.profile, id], (err, res)=>{
        if(err){
            console.log('Error while updating the users');
            result(null, err);
        }else{
            console.log("users updated successfully");
            result(null, res);
        }
    });
}

// delete users
Users.deleteUsers = (id, result)=>{
     dbConn.query('DELETE FROM users WHERE id=?', [id], (err, res)=>{
         if(err){
            console.log('Error while deleting the users');
            console.log(err);
             result(null, err);
         }else{
            result(null, res);
    }
    });

    
}

module.exports = Users;
