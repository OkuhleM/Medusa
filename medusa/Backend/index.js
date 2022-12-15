const express = require("express");
const { json } = require("express");
const validator = require('express-validator');
const { body, validationResult } = require('express-validator');

const app = express();
require('dotenv').config()
console.log(process.env)
const cors = require("cors")
const {AppUsers} = require('./routes/usersRoutes')
const {UserPosts} = require('./routes/postRoutes')

app.use(express.json())
app.use(express.urlencoded({ extended: "false" }));
app.use(json());
app.use(cors())
app.use(validator());
app.use(require('connect-flash')());

AppUsers(app)
UserPosts(app)
const port = process.env.PORT ;

app.use(express.json());
app.listen(port, () => console.log(`app running on ${port}`))