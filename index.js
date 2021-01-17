require('dotenv').config({ path: './env/.env' });
const express= require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const ss = require('socket.io-stream')
const app = express();
var server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose')
// const axios = require('axios');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')
app.use(cors());

mongoose.connect(process.env.db_url, {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

const Person= require('./db-models/person');

var nodemailer = require('nodemailer');
const { getMaxListeners } = require('./db-models/person');
const { default: axios } = require('axios');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email_id,
      pass: process.env.email_password
    }
  });

//Setting up twillio to send messages(paid service)
// var accountSid = process.env.sms_id; 
// var authToken = process.env.sms_token;   
// const client = require('twilio')(accountSid, authToken);

app.get('/',(req,res)=>{
    res.render('home')
})

app.post('/create',async (req,res)=>{
    try{
        const p=await Person.create({
            latitude:req.body.latitude,
            longitude:req.body.longitude
        })

        //the following code below can be used to send a text message after purchasing in twilio.com

        // await client.messages
        //     .create({
        //         body: 'ALERT there has been a woman safety issue!!Visit http://localhost:3000/tracker/'+p._id+' to get the location',
        //         from: {mobile number from api},
        //         to: {to mobile number}
        //     })
        //     .then(message => console.log(message.sid));
        fs.readFile('./contacts/contact.json','utf-8',(err,content)=>{
            if(err){
                console.log(err);
            }else{
                try {
                    const data=JSON.parse(content);
                    for (const contact of data.contacts){
                        if(contact.extension!="example.com"){
                            var mailOptions = {
                                from: process.env.email_id,
                                to: contact.email,
                                subject: 'ALERTTT theres a woman in trouble',
                                text: 'We have noticed through our web application that a women is in trouble and is calling for help. Visit http://localhost:3000/tracker/'+p._id+' to get the location '
                            };
                            transporter.sendMail(mailOptions, function(error, info){
                                if (error) {
                                  console.log(error);
                                } else {
                                  console.log('Email sent: ' + info.response);
                                }
                              });                            
                        }
                    }
                } catch (error) {
                    console.log(error)
                }
            }
        })
        return res.status(200).json({message:"created",id:p._id});
    }catch(err){
        console.log(err)
        return res.status(400).json({message:"not created"});
    }
})

app.get('/tracker/:id',async(req,res)=>{
    try {
        const person=await Person.findById(req.params.id);
        if(person==null) return res.send("Not found");
        res.render('tracking',{person:person});
    } catch (error) {
        console.log(error);
        return res.send("error while opening")
    }
})

io.on('connection',(socket)=>{
    console.log("user connected");
})

io.on('connect', (client) => {
    console.log(`Client connected [id=${client.id}]`);
    client.emit('server_setup', `Server connected [id=${client.id}]`);

    ss(client).on('audio-stream', function(stream, data) {
      const filename = path.basename(data.name);
      console.log(filename);
      stream.pipe(fs.createWriteStream(filename));
      axios.get('http://localhost:5000/')
        .then(async (response)=> {
            console.log(response);
            if(response=="Emergency"){
                const p=await Person.create({
                    latitude:req.body.latitude,
                    longitude:req.body.longitude
                })
        
                //the following code below can be used to send a text message after purchasing in twilio.com
        
                // await client.messages
                //     .create({
                //         body: 'ALERT there has been a woman safety issue!!Visit http://localhost:3000/tracker/'+p._id+' to get the location',
                //         from: {mobile number from api},
                //         to: {to mobile number}
                //     })
                //     .then(message => console.log(message.sid));
                fs.readFile('./contacts/contact.json','utf-8',(err,content)=>{
                    if(err){
                        console.log(err);
                    }else{
                        try {
                            const data=JSON.parse(content);
                            for (const contact of data.contacts){
                                if(contact.extension!="example.com"){
                                    var mailOptions = {
                                        from: process.env.email_id,
                                        to: contact.email,
                                        subject: 'ALERTTT theres a woman in trouble',
                                        text: 'We have noticed through our web application that a women is in trouble and is calling for help. Visit http://localhost:3000/tracker/'+p._id+' to get the location '
                                    };
                                    transporter.sendMail(mailOptions, function(error, info){
                                        if (error) {
                                          console.log(error);
                                        } else {
                                          console.log('Email sent: ' + info.response);
                                        }
                                      });                            
                                }
                            }
                        } catch (error) {
                            console.log(error)
                        }
                    }
                }) 
                client.emit('results','success');           
            }    
        })
        .catch(function (error) {
            client.emit('results',"error");
        console.log(error);
        })
    });
});


server.listen(3000,function(){
	console.log('you are listening to port 3000');
})