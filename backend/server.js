const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();

mongoose.connect('mongodb://localhost:27017/agenda')

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.static('public'));

//app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.redirect('index');
});

app.get('/index', (req, res) => {
    res.render('index');
});




app.use((req, res) => {
    res.render('error', { texto: "ERROR 404: SITIO NO ENCONTRADO" });
});

app.listen(80);