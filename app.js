require('dotenv').config({ path: './.env' })
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');
const wakeUpDyno = require("./wakeByDyno.js");

//Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const genreRoutes = require('./routes/genre');
const blogRoutes = require('./routes/blogs');

//App
const app = express();
const server = http.createServer(app);
server.get('/',(req, res)=>{
    res.render("App Running..");
})

//Database
mongoose.connect("mongodb+srv://blogApp:blogApp@blogapp.vnwb9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected...'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

//Middleware
server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(cookieParser());
server.use(expressValidator());
server.use(cors());

//routes middleware
server.use('/api', authRoutes);
server.use('/api', userRoutes);
server.use('/api', blogRoutes);
server.use('/api', genreRoutes);

const DYNO_URL = "https://blog-app-farookjintha.herokuapp.com/api/blogs"
const port  = process.env.PORT || 8000
server.listen(port, () =>{
    wakeUpDyno(DYNO_URL);
    console.log(`The server is running on port ${port}`);
});

