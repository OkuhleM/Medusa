require("dotenv").config();
const mongoose = require('mongoose');
const connectToMongoDB = process.env.MONGO_URI;

mongoose.connect(connectToMongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((res) => console.log('I am connected to MongoDB'))
    .catch((err) => console.log(err))

const UsersSchema = mongoose.Schema({
    name: {
        type: "string",
        required: true
    },
    username: {
        type: "string",
        required: true
    }
,
    email: {
    type: "string",
    required: true
},
    password: {
    type: "string",
    required: true
},
confirmPassword: {
    type: "string",
    required: true
},
phoneNumber: {
type: Number,
required: true
},
selection: {
type: "string",
required: true
},
dateOfBirth: {
    type: Date,
    required: true
},

    url: { type: String, default: '' },
    image: { type: String, default: 'default.png' },
    description: { type: String, default: '' },
    posts: Array,
    followers: Array,
    following: Array

}) 

const users = mongoose.model("UsersSchema",UsersSchema)
module.exports = {users}