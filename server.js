const express = require('express');
const dotenv = require('dotenv');
const bodyparser = require("body-parser");
const path = require('path');

const connect = require('./server/database/connection');

const app = express();

dotenv.config( { path : 'config.env'} )
const PORT = process.env.PORT || 8080


connect();

app.use(bodyparser.urlencoded({ extended : true}))
app.use(express.json())
app.set("view engine", "ejs")

app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))
app.use('/', express.static(path.resolve(__dirname, "web")))
app.use('/admin', require('./server/routes/router'))
app.use('/api', require('./server/routes/regrouter'))
app.use('/star', require('./server/routes/srouter'))
app.use('/newstar', require('./server/routes/newrouter'))
app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});
