const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    from: 'noreply@express.localhost',
    settings: {
host: 'smtp.mailtrap.io',
port: 2525,
        auth: {
          user: '',
          pass: ''
        }
    }
  });

  
transporter.sendMail((error,info)=>{
    if(error){
        console.log(error)
    }else{
        console.log(info)
    }
})