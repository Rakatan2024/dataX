const express = require('express');
const router = express.Router()
const Post = require('../model/model');
const admin = require('../model/admin')

router.post('/login', async (req,res) => {
    const {name, password} = req.body
    try{
        let user = await Post.findOne({name,password}).lean()
        if(!user) {
            user = await admin.findOne({name,password}).lean()
            if(!user) {
                return res.json({status:'error', error:'Invalid username/password'})
            }else  {
                return res.json({status:'adminok'})
            }
        }
        return res.json({status:'ok'})
    }catch(e){
        res.status(500).json(e)
    }
})
router.post('/register', async (req,res) => {
    const {name, email, city, password} = req.body
    if(!name || typeof name !== 'string') {
        return res.json({status:'error', error:'Invalid name'})
    }

    if(!password || typeof password !== 'string') {
        return res.json({status:'error', error:'Invalid password'})
    }
    if(password.length < 7) {
        return res.json({status: 'error', error: 'Password too small. should be at least 7 characters'})
    }
    let count1=0, count2=0 ,count3=0
    for(let i=0; i <password.length;i++){
        if(password[i].toUpperCase() === password[i]){
            count1++
        }
        else if(password[i].toLowerCase()===password[i]){
            count2++
        }
        if(password.charCodeAt(i) === (46 || 95)){
            count3++
        }
    }
    if(count1 === 0 ){
        return res.json({status:'error', error:"should be at least one uppercase"})
    }
    else if(count2 === 0){
        return res.json({status:'error', error:"should be at least one lowerrcase"})
    }
    /* else if(count3 === 0){
         return res.json({status:'error', error:"should be at least one special character"})
     }*/
    try {
        const post = await Post.create({name, email, city, password})
        res.json({status:'ok'})
    } catch (e) {
        if(e.code === 11000) {
            return res.json({status: 'error', error:'Username already in use. Take another one'})
        }
        throw e
    }
})
module.exports = router;