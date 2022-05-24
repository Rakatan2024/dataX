let users_crud = require('../model/model');

// create and save new user
exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be empty!"});
        return;
    }

    // new user
    const user = new users_crud({
        name : req.body.name,
        city : req.body.city,
        email : req.body.email,
        password: req.body.password

    })

    // save user in the database
    user
        .save(user)
        .then(() => {
            //res.send(data)
            res.redirect('/admin/add-user');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all users/ retrive and return a single user
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;
        users_crud.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                   res.send(data)
                }
            })
            .catch(() =>{
                res.status(500).send({ message: "Erro retrieving user with id " + id})
            })

    }else {
        users_crud.find().sort({name: 1, city: 1, email: 1}) // sorting users by name in ascending order
            .then(user => {
                res.send(user)
            })
            .catch(err => {
                res.status(500).send({message: err.message || "Error Occurred while retriving user information"})
            })
    }
}




// Update a new idetified user by user id
exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }
    const id = req.params.id;
    users_crud.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update user with ${id}. Maybe user not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(() =>{
            res.status(500).send({ message : "Error Update user information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    users_crud.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "User was deleted successfully!"
                })
            }
        })
        .catch(() =>{
            res.status(500).send({
                message: "Could not delete User with id=" + id
            });
        });
}