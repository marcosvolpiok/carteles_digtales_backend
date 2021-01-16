const express = require('express');
const app = express();

const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const serveStatic = require('serve-static');
app.use(cors());
app.use(bodyParser.json());

app.use('/upload', serveStatic(path.join(__dirname, 'upload')));

//IMPORT ROUTE
const userRoute = require('./routes/user');
const routerPoster = require('./routes/poster');
//const loginRoute = require('./routes/login');


//INIT ROUTE
app.use('/user',userRoute);
app.use('/poster',routerPoster);

//Errors
app.use(function(err, req, res, next){
  res.status(400).json({message: err.message});
});

//MONGODB CONNECTION
const mongoOptions = { useNewUrlParser: true };
if (process.env.MONGO_DB_USER) {
    mongoOptions.useUnifiedTopology = true;
    mongoOptions.useNewUrlParser = true;
    mongoOptions.user = process.env.MONGO_DB_USER;
    mongoOptions.pass = process.env.MONGO_DB_PASS;
  }

//export DATABASE_URL=mongodb://localhost/digital_posters
//export JWT_KEY=1234
//mongoose.connect('mongodb+srv://admin-user:AO8Cs8KLAOqRMwvU@cluster0.qdhog.mongodb.net/minesweeper?retryWrites=true&w=majority')

/*
mongoose.connect(`${process.env.DATABASE_URL}`,mongoOptions)
    //.then(() => console.log("MongoDB conected ..."))
    .catch(err => console.log(err));
    */
mongoose.connect(`${process.env.DATABASE_URL}`, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true });
//START SERVER

//import express from 'express';
const Server=require('socket.io');

const port = process.env.PORT || 3050;

const server = app.listen(port, '0.0.0.0');
io = new Server(server, { cors: { origin: '*' } });

console.log('listening at port 3050');

io.on('connection', function(socket){
  socket.on('action', function(action){
    io.emit('action', 'CONECTADO');
    console.log('Action', action);
  });
});
