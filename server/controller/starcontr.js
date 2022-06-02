let stars = require('../model/star');

exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be empty!"});
        return;
    }

    // new user
    const star = new stars({
        name : req.body.name,
        type : req.body.type,
        age : req.body.age,
        radius: req.body.radius,
        price:req.body.price

    })

    // save user in the database
    star
        .save(star)
        .then(() => {
            //res.send(data)
            res.redirect('/star/add-star');
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}
exports.find = (req, res)=>{
    if(req.query.id){
        const id = req.query.id;
        stars.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found user with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(() =>{
                res.status(500).send({ message: "Error retrieving user with id " + id})
            })

    }else {
        stars.find().sort({name: 1}) // sorting users by name in ascending order
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
    stars.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update star with ${id}. Maybe star not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(() =>{
            res.status(500).send({ message : "Error Update star information"})
        })
}

// Delete a user with specified user id in the request
exports.delete = (req, res)=>{
    const id = req.params.id;

    stars.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Star was deleted successfully!"
                })
            }
        })
        .catch(() =>{
            res.status(500).send({
                message: "Could not delete star with id=" + id
            });
        });
}
