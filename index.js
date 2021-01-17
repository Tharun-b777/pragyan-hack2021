const express= require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const ss = require('socket.io-stream')
const app = express();
var server = require('http').Server(app);
const io = require('socket.io')(server);
const mongoose = require('mongoose')

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs')
app.use(cors());

mongoose.connect('mongodb://localhost/pragy', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})

const Person= require('./db-models/person');

app.get('/',(req,res)=>{
    res.render('hello')
})

app.post('/create',async (req,res)=>{
    try{
        const p=await Person.create({
            latitude:req.body.latitude,
            longitude:req.body.longitude
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
        res.render('track',{person:person});
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
      client.emit('results',"hello");
    });
});


server.listen(3000,function(){
	console.log('you are listening to port 3000');
})