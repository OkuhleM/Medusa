const { PostSchema } = require('../Models/Posts');
const Upload = require('upload');

const UserPosts = app => {
    app.post("/posts/create",async(req,res,next)=>{
        if(req.session.user) {
            try {
                const upload = new Upload({ 
                    filename: 'image', 
                    destination: UPLOAD_PATH + 'posts', 
                    newName: crypto.createHash('sha256').update(Date.now().toString()).digest('hex') 
                });
    
                const uploaded = await upload.save(req, res);
    
                if(uploaded.done) {
                    const { description } = uploaded.body;
                    const {  file } = uploaded;
                    const errors = [];
    
                    if(validator.isEmpty(description)) {
                        errors.push({
                            param: 'description',
                            msg: 'Description is a required field.'
                        });
                    }
    
                    if(errors.length > 0) {
                        fs.unlinkSync(file.path);
                        res.json({ errors });
                    } else {
                        const newPost = new PostSchema({
                            description,
                            image: file.filename,
                            user: req.session.user.username,
                            date: new Date()
                        });
    
                        newPost.save().then(post => {
                            users.findOneAndUpdate({ _id: req.session.user._id}, { $push: { posts: post._id } }).then(result => {
                                res.json({ created: true, postid: post._id });
                            });
                        });
                    }
                } else {
                    res.json({ created: false });
                }
            } catch(err) {
                res.json(err);
            }
        } else {
            res.sendStatus(403);
        }    
    })
}
module.exports = {UserPosts}