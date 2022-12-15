require("dotenv").config();
const mongoose  = require('mongoose');
const connectToMongoDB = process.env.MONGO_URI;


mongoose.connect(connectToMongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then((res) => console.log('I am connected to MongoDB'))
    .catch((err) => console.log(err))

const PostSchema = mongoose.Schema({
    description: {
        type: "string"
    },
    image: {
        type: "string"
    },
    user: {
        type: "string"
    },
    date:{
        type: Date
    }

});
const posts =  mongoose.model('posts', PostSchema);
module.exports = {posts};
