const mongoose = require('mongoose');

let admin = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    password:  {
        type:String,
        required: true
    }
})
const admins = mongoose.model('admin',admin)
module.exports = admins