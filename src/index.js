const express = require('express');
const routes = require('./routes');
const handlebars = require('express-handlebars');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const {auth} = require('./middlewares/authMiddleware');

const app = express();

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use('/static',express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(auth);
app.use(routes);

mongoose.connect('mongodb://127.0.0.1:27017/crypto')

app.listen(3000, () => {console.log('Server is running on port 3000');});

