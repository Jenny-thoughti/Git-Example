const models = require('../models');
const Users = models.User;
const bcrypt = require('bcrypt');
const BCRYPT_SALT_ROUNDS = 12;
var moment = require("moment");

//get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.scope('withoutPassword').findAndCountAll({});
    return res.status(200).json({users});
  } catch (error) {
    return res.status(500).send(error.message) ; 
  }
};



const getById = async (req, res, err) => {
  try{
   
    let id = req.params.id;
    
    let users = await Users.findByPk(id,  {});
    return res.status(200).json({users });

 
    
    
  }
  catch(error){
    res.send(error);
    if(Users.length <= 0)
    return res.status(500).send(error.message);
  }
};


const scopes = async (req, res) => {
  try{
  const data = await Users.scope(['checkStatus', 'withoutPassword']).findAndCountAll({});
  // const data = await Users.findAll({
  //   where: {
  //     status: '0',
  //   },
  // });
  res.status(200).json(data);
  }catch(error){
    return res.status(404).send(error.message);
  }
};

//create 
const addUser = async (req, res) => {
 try{
  // let info = {
  //   first_name: req.body. first_name,
  //   last_name: req.body.last_name,
  //   email: req.body.email,
  //   user_name: req.body.user_name,
  //   password: req.body.password,
  //   role: req.body.role,
  //   status: req.body.status,
  //   qualification: req.body.qualification
  // }


  const {first_name,last_name,email,user_name,password,role,status,qualification} = req.body;
  const hash = await bcrypt.hash(password, 12);
  const info = {first_name, last_name, email, user_name, password:hash, role, status, qualification}
  const users = await Users.create(info)
  res.status(200).send(users)
}catch(error){
  return res.status(404).send(error.message);
}
}

//Update
const updateUsers = async (req,res) => {
try{
  let id = req.params.id
  const {first_name,last_name,email,user_name,password,role,status,qualification} = req.body;
  const hash = await bcrypt.hash(password, 12);
  const date = await moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
  const info = {first_name, last_name, email, user_name, password:hash, role, status, qualification , updated_at:date}
  
  const users = await Users.update(info, {where : {id: id}})
  res.status(200).send(users)
}catch(error){
  return res.status(404).send(error.message);
}
}


//delete
const deleteUsers = async (req,res) => {
try{
  let id = req.params.id
  await Users.destroy({where: {id : id}})
  res.status(200).send('Product is deleted !')
}catch(error){
  return res.status(404).send(error.message);
}
}

module.exports = {
  getAllUsers,
  getById,
  addUser,
  updateUsers,
  deleteUsers,
  scopes
};
