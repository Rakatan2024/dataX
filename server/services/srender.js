const axios = require('axios');


exports.shomeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('https://boiling-island-12959.herokuapp.com/star/api/stars')
        .then(function(response){
            res.render('sindex', { stars : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_star = (req, res) =>{
    res.render('add_star');
}

exports.update_star = (req, res) =>{
    axios.get('https://boiling-island-12959.herokuapp.com/star/api/stars', { params : { id : req.query.id }})
        .then(function(stardata){
            res.render("update_star", { star : stardata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}
