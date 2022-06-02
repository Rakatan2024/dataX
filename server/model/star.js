const mongoose = require('mongoose');

let star = new mongoose.Schema({
    name: {
        type:String,
        required: true
    },
    type: {
        type:String,
        required: true
    },
    age: {
        type:Number,
        required:true
    },
    radius: {
        type:String,
        required: true
    },
    price:{
        type:Number,
        required:true
    }
})
const stars = mongoose.model('star',star)
module.exports = stars