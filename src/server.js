const express = require('express');
const app = express();

// Paquetes Adicionales
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

// Base de Datos MongoDB
const { url } = require('./config/database');

mongoose.connect(url, {
});

require('./config/passport')(passport);

// Configuraciones
app.set('port', process.env.PORT || 3000 );
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", 'ejs');

// Middlewares
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(session({
    secret: 'nodelogin',
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Rutas
require('./app/routes')(app, passport);

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), () => {
    console.log('¡Servidor encendido!');
});