const axios = require('axios');


exports.shomeRoutes = (req, res) => {
    // Make a get request to /api/users
    axios.get('https://evening-retreat-93314.herokuapp.com/newstar/api/stars')
        .then(function(response){
            res.render('newsindex', { stars : response.data });
        })
        .catch(err =>{
            res.send(err);
        })
}

exports.add_star = (req, res) =>{
    res.render('add_star');
}

exports.update_star = (req, res) =>{
    axios.get('https://evening-retreat-93314.herokuapp.com/newstar/api/stars', { params : { id : req.query.id }})
        .then(function(stardata){
            res.render("update_star", { star : stardata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}