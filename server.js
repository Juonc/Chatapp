const express = require('express')
var bodyParser = require('body-parser')

const app = express()
var http = require('http').Server(app)
//var io = require("socket.io")(http);
var mongoose = require('mongoose');
const { send } = require('process')

const port = process.env.port || 3010;
app = express()
app.set("port", PORT);
//var port_number = server.listen(process.env.PORT || 3010);
//app.listen(port_number);

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//mongodb+srv://Admin:<password>@chatapp.sfzsh.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
var dbUrl = 'mongodb+srv://Admin:QW3mvBml4IfFQ1QJ@chatapp.sfzsh.mongodb.net/Chatapp?retryWrites=true&w=majority';
var Message = mongoose.model('Message', {
  name : String, message: String
})
//var messages = [
//  { name: "John", message: "Hello from Sydney" }, { name: "Rose", message: "Nice to see you" },
//];
app.get('/messages', (req, res) => {
  //res.send("Hello World!")
  Message.find({}, (err,messages) =>{
    res.send(messages);
  });
})
app.post('/messages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err) 
      res.sendStatus(500);

    //console.log(req.body);
    //messages.push(req.body);
    //io.emit("message", req.body);
    res.sendStatus(200);
  });
});

mongoose.connect(dbUrl, (err) => {
  //if (err) return console.log(err);
  console.log('mongodb connection successful');
});

// socket.on("connect", () => {
//   console.log(socket.connected); // true
// });

app.listen(port, () => {
  console.log('Server is listening on port ', port )
})
console.log('I am listening')
