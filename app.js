require('dotenv').config({ path: './.env' })
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const expressValidator = require('express-validator');

//Import Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const genreRoutes = require('./routes/genre');
const blogRoutes = require('./routes/blogs');

//App
const app = express();

//Database
mongoose.connect(process.env.ATLAS_DB, {
    useNewUrlParser: true, 
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log('Database Connected...'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`)
  });

//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

//routes middleware
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', blogRoutes);
app.use('/api', genreRoutes);


const port  = process.env.PORT || 8000

const server = app.listen(port, () =>{
    const serverPort = server.address().port;
    console.log(`The server is running on port ${serverPort}`);
});

