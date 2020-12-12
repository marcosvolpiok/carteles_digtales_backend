const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json());

//IMPORT ROUTE
const userRoute = require('./routes/user');
const mapRoute = require('./routes/map');
const routerPoster = require('./routes/poster');
//const loginRoute = require('./routes/login');


//INIT ROUTE
app.use('/user',userRoute);
app.use('/map',mapRoute);
app.use('/poster',routerPoster);

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
mongoose.connect(`${process.env.DATABASE_URL}`,mongoOptions)
    .then(() => console.log("MongoDB conected ..."))
    .catch(err => console.log(err));
//START SERVER
app.listen(3050)