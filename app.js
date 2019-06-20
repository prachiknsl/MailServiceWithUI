const express = require('express');
const bodyParser = require('body-parser');
const handler = require('express-handlebars');
const nodemailer = require('nodemailer');
const path = require('path');

const app=express();

app.engine('handlebars',handler());
app.set('view engine','handlebars');

//html pages
app.use('/public',express.static(path.join(__dirname,'public')));

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('contact');
});

app.post('/',(req,res)=>{
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:
        {
          user: 'milkmanapi@gmail.com',
          pass: 'milkman@123'
        }
      }); 
      const mailOptions={
          from:'milkmanapi@gmail.com',
          to:  req.body.email,
          subject:'Mail Service',
          text:'HAVE A NICE DAY!!!'
          }
  
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
                } 
            else {
              console.log('Email sent: ' + info.response);
                }
                res.render('contact',{msg:'Email has been sent'});
          });
  // console.log(req.body);
});
app.listen(3001);