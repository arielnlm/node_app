const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const history = require('connect-history-api-fallback');
const { sequelize,  } = require('./models');
app.use(express.static(path.join(__dirname, 'static')));

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

function authToken(req, res, next) {
    
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}

function isLogged(req){
    let token = req.headers['cookie'];
    if(token == undefined)
        return false;
    token = token.split('=')[1];
    if(token == undefined)
        return false;
    console.log("token je " + token);
    return token.length > 0;
}

function isAdmin(req){
    let token = req.headers['cookie'];
    if(token == undefined)
        return false;
    token = token.split('=')[1];
    if(token == undefined || token.length == 0)
        return false;
    
    return jwt.decode(token).admin;
}

/*
app.get("/", (req, res) => {
    res.send('index.html', {root: './static'});
});*/
app.get('/admin/register', (req, res) => {
    if(!isLogged(req))
        res.sendFile('register.html', { root: './static/user' });
    else
        res.redirect(301, '/admin/index');
});

app.get('/admin/login', (req, res) => {
    if(!isLogged(req))
        res.sendFile('login.html', { root: './static/user' });
    else
        res.redirect(301, '/admin/index');
});

app.get('/admin/index', (req, res) => {    
    res.sendFile('index.html', { root: './static' });
});
app.get('/admin/users/panel', (req, res) => {
    if(isAdmin(req))
        res.sendFile('cp_users.html', { root: './static/control' });
    else
        res.redirect(301, '/admin/index');
});
app.get('/admin/books/panel', (req, res) => {
    if(isLogged(req))
        res.sendFile('cp_books.html', { root: './static/control' });
    else
        res.redirect(301, '/admin/login');
});
app.get('/admin/messages/panel',(req, res) => {
    if(isLogged(req))
        res.sendFile('cp_messages.html', { root: './static/control' });
    else
        res.redirect(301, '/admin/login');
});
app.get('/admin/events/panel',(req, res) => {
    if(isLogged(req))
        res.sendFile('cp_events.html', { root: './static/control' });    
    else
        res.redirect(301, '/admin/login');
});

const staticMdl = express.static(path.join(__dirname, 'dist'));

app.use(staticMdl);

app.use(history({index: '/index.html'}));

app.use(staticMdl);

app.listen({ port: process.env.PORT || 8000 }, async () => {
    await sequelize.authenticate();
    console.log("App na portu 8000 otvoren.");
});