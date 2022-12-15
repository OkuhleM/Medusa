const { promises } = require("nodemailer/lib/xoauth2");
const { UsersSchema } = require("../Models/Users");

const AppUsers = async (app) => {
app.post('/register', async (req,res)=>{

    const errors = [];
    const { name, username, email, password, confirmPassword, phoneNumber, selection, dateOfBirth } = req.body
    
    if(validator.isEmpty(name)) {
        errors.push({
            param: 'name',
            msg: 'Name is a required field.'
        });
    }
    if(!validator.isEmail(email)) {
        errors.push({
            param: 'email',
            msg: 'Invalid e-mail address.'
        });
    }
    if(!validator.isAlphanumeric(username)) {
        errors.push({
            param: 'username',
            msg: 'Invalid username.'
        });
    }
    if(validator.isEmpty(password)) {
        errors.push({
            param: 'password',
            msg: 'Password is a required field.'
        });
    }if(password !== confirmPassword) {
        errors.push({
            param: 'confirmPassword',
            msg: 'Passwords do not match.'
        });
    }
    if(validator.isEmpty(phoneNumber)) {
        errors.push({
            param: 'phoneNumber',
            msg: 'Phone Number is a required feild'
        });
    }
    if(validator.isEmpty(selection)) {
        errors.push({
            param: 'selection',
            msg: 'Gender is a required feild'
        });
    }
    if(validator.isEmpty(dateOfBirth)) {
        errors.push({
            param: 'dateOfBirth',
            msg: 'date of birth is a required feild'
        });
    }
    try{
        const usernameExists = await UsersSchema.countDocuments({ username: username });
        const emailExists = await UsersSchema.countDocuments({ email: email });

        if(usernameExists === 1) {
            errors.push({
                param: 'username',
                msg: 'Invalid username.'
            });
        }

        if(emailExists === 1) {
            errors.push({
                param: 'email',
                msg: 'Invalid e-mail address.'
            }); 
        }
    }
catch(error){
    res.json({error:error});
}


if(errors.length > 0) {
    res.json({ errors });
} else {
    const encryptPassword = crypto.createHash('sha256').update(password).digest('hex');

    let newUser = new UsersSchema({
        name,
        email,
        username,
        password: encryptPassword,
        phoneNumber,
        selection,
        dateOfBirth

    });

    let mailer = new Mail({
        from,
        settings
    });
    try{
        await newUser.save();
        await mailer.send({to:email, subject:"Welcome To the Medusa App", body: `Welcome
        ${username}!`});
        
    }catch(err){
        res.json({error: err});
    }
    
    res.json({sucess: true});
}
});

app.post('/login', async (req,res,next)=>{
    const {email,password} = req.body;
    const encryptPassword = crypto.createHash('sha256').update(password).digest('hex');
    try{
        const user = await UsersSchema.findOne({ email: email, password: encryptPassword});
        if(user) {
            req.session.user = user;
            res.json({ success: true, username: user.username });
        } else {
            res.json({ success: false }); 
        }
    }catch(err){
        res.json({ success: false });
    }
})

app.post('/profile/:username/edit',async (req,res,next) => {
    if(req.session.user) {
        const { username } = req.params;
        try {
            const upload = new Upload({ 
                filename: 'image', 
                destination: UPLOAD_PATH + 'profiles', 
                newName: crypto.createHash('sha256').update(Date.now().toString()).digest('hex') 
            });

            const uploaded = await upload.save(req, res);

            if(uploaded.done) {
                const { url, description } = uploaded.body;
                const {  file } = uploaded;
                const data = {
                    url,
                    description,
                    image: file.filename
                };
                await UsersSchema.findOneAndUpdate({ username: username }, { $set: data });

                res.json({ updated: true, username });
            } else {
                res.json({ updated: false });
            }    
        } catch(err) {
            res.json(err); 
        }
    } else {
        res.sendStatus(403); 
    }
})

app.post('/follow', async (req,res,next)=>{
    const {follower, following, action } = req.body;
    try{
switch(action){
    case 'follow':
        await Promise.all([
            UsersSchema.findByIdAndUpdate(follower, {$pull: { following: following }}),
            UsersSchema.findByIdAndUpdate(following, {$pull: { followers: follower }})

        ]);
        break;
        default: 
        break;
}
res.json({done:true});
    }catch(error){
        res.json({done: false})
    }
})

}
module.exports = {AppUsers}