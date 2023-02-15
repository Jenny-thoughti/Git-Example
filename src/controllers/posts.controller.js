
var PostsModel = require('../posts.js');

const postsController = {
    getAllUsers: (req, res) => {
        return res.status(200).send({
            count: 5,
            rows: [{}, {}],
        });
    },

    //list of users
    getPostsList : (req, res)=> {
        PostsModel.getAllPosts((err, posts) =>{
        console.log('We are here');
        if(err)
        res.send(err);
        console.log('Posts', posts);
        res.send(posts)
    })
},

    //users with id
    getPostsByID : (req, res)=>{

        PostsModel.getPostsByID(req.params.id, (err, posts)=>{
            if(err)
            res.send(err);
            if(posts.length <= 0)
            return res.status(404).send({error: 'Posts not found' });
        
            console.log('single user data',posts);
            res.send(posts);
        
            
        })
        
    },

    //create new users
    createNewPosts :(req, res) =>{
        const postsReqData = new PostsModel(req.body);
        console.log('postsReqData', postsReqData);
        // check null
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            res.send(400).send({success: false, message: 'Please fill all fields'});
        }else{
            PostsModel.createPosts(postsReqData, (err, posts)=>{
                if(err)
                res.send(err);
              
                res.json({status: true, message: 'Posts Created Successfully', data: posts.insertId})
            })
        }
    },

    //update users
    updatePosts : (req, res)=>{
        const postsReqData = new PostsModel(req.body);
        console.log('postsReqData update', postsReqData);
        
        // check null
        if(req.body.constructor === Object && Object.keys(req.body).length === 0){
            res.send(400).send({success: false, message: 'Please fill all fields'});
        }else{
            PostsModel.updatePosts(req.params.id, postsReqData, (err, posts)=>{
                if(err)
                res.send(err);
               res.json({status: true, message: 'Update Posts updated Successfully'})
                 
            })
        }
    },

    //Delete users
    deletePosts :(req, res)=>{
        PostsModel.deletePosts(req.params.id, (err, posts)=>{
            if(err)
            res.send(err);
            res.json({success:true, message: 'Posts deleted successully!'});
        })
    }

};

module.exports = postsController;



