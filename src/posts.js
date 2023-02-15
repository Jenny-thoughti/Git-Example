
var dbConn  = require('../config');

var Posts = function(posts){
    this.name      =   posts.name;
    this.comment_status  =   posts.comment_status;
    this.users_id = posts.users_id;
}

// get all Posts
Posts.getAllPosts = (result) =>{
    dbConn.query('SELECT * FROM posts ', (err, res)=>{
        if(err){
            console.log('Error while fetching posts', err);
            result(null,err);
        }else{
            console.log('Posts fetched successfully');
            result(null,res);
        }
    })
}

// get Posts by ID from DB
Posts.getPostsByID = (id, result)=>{
    dbConn.query('SELECT * FROM posts WHERE id=?', id, (err, res)=>{
        if(err){
            console.log('Error while fetching posts by id', err);
            result(null, err);
        }else{
            result(null, res);
        }
    })
}

// create new users
Posts.createPosts = (postsReqData, result) =>{
    console.log(postsReqData);
     dbConn.query('INSERT INTO posts SET ? ', postsReqData, (err, res)=>{
        if(err){
            return res.status(404).send({error: 'User not found' });
            console.log('Error while inserting data',err);
            result(null, err);
        }else{
            console.log('Posts created successfully');
            result(null, res)
        }
    })
}

// update users
Posts.updatePosts = (id, postsReqData, result)=>{
    dbConn.query("UPDATE posts SET name=?, comment_status=?, users_id=? WHERE id = ?", 
    [postsReqData.name, postsReqData.comment_status,postsReqData.users_id, id], (err, res)=>{
        if(err){
            console.log('Error while updating the posts');
            result(null, err);
        }else{
            console.log("posts updated successfully");
            result(null, res);
        }
    });
}


// delete posts
Posts.deletePosts = (id, result)=>{
     dbConn.query('DELETE FROM posts WHERE id=?', [id], (err, res)=>{
         if(err){
            console.log('Error while deleting the posts');
             result(null, err);
         }else{
            result(null, res);
    }
    });

    
}

module.exports = Posts;

