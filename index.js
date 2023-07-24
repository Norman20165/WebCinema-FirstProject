const express = require('express');
const mongoose = require('mongoose');

const app = express();

const port = 3000;

let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/films');

let film_listSchema = new mongoose.Schema({
    title: String,
    path: String,
    englishTitle: String,
    titleForLinks: String,
    titleForClasses: String,
    fileName: String,
    slogan: String,
    description: String,
    year: Number,
    country: String,
    genre: String,
    director: String,
    budget: String,
    income: String,
    time: Number,
});

let Film_list = mongoose.model('film_lists', film_listSchema);

let ratings_listSchema = new mongoose.Schema({
    title: String,
    englishTitle: String,
    titleForLinks: String,
    titleForClasses: String,
    fileName: String,
    path: String,
    year: String,
    filmLength: String,
    country: String,
    genre: String,
    director: String,
    cast: String,
    slogan: String,
    description: String,
    budget: String,
    income: String,
});

let Ratings_list = mongoose.model('ratings_lists', ratings_listSchema);

let account_Schema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
    }, password: {
        type: String,
        required: true,
    }, firstName: {
        type: String,
        required: false,
    }, lastName: {
        type: String,
        required: false,
    }, sex: {
        type: String,
        required: false,
    }, birth: {
        type: String,
        required: false,
    }, mail: {
        type: String,
        required: false,
    }, phone: {
        type: String,
        required: false,
    }, city: {
        type: String,
        required: false,
    }, aboutMe: {
        type: String,
        required: false,
    }, hobbies: {
        type: String,
        required: false,
    },
});

let Account_list = mongoose.model('account_lists', account_Schema);

app.listen(port, function() {
    console.log(`http://localhost:${port}`);
});

app.get('/films', async function(req, res) {
    let data;
    let id = req.query.id;

    if (!id) {
        data = await Film_list.find();
    } else {
        data = await Film_list.findOne({_id: id});
    };

    res.send(data);
});

app.get('/ratings', async function(req, res) {
    let data;
    let id = req.query.id;

    if (!id) {
        data = await Ratings_list.find();
    } else {
        data = await Ratings_list.findOne({_id: id});
    };

    res.send(data);
});

app.get('/login', async function(req, res) {
    let login = req.query.login;
    let data = await Account_list.findOne({login: login});
    if (data) {
        res.send(true);
    } else {
        res.send(false);
    };
});

app.get('/logins', async function(req, res) {
    let login = req.query.login;

    if (!login) {
        let data = await Account_list.find();
        res.send(data);
    } else {
        let data = await Account_list.findOne({login: login});
        res.send(data);
    };
});

app.get('/delete_account', async function(req, res) {
    let id = req.query.id;

    await Account_list.deleteOne({_id: id});
    res.send(true);
});

app.get('/new_login', async function(req, res) {
    let id = req.query.id;
    let login = req.query.login;

    await Account_list.findOneAndUpdate({_id: id}, {login: login});

    res.send(true);
});

app.get('/new_password', async function(req, res) {
    let id = req.query.id;
    let password = req.query.password;

    await Account_list.findOneAndUpdate({_id: id}, {password: password});

    res.send(true);
});

app.get('/change_data', async function(req, res) {
    let firstName = req.query.firstName;
    let lastName = req.query.lastName;
    let sex = req.query.sex;
    let birth = req.query.birth;
    let phone = req.query.phone;
    let email = req.query.email;
    let city = req.query.city;
    let aboutMe = req.query.aboutMe;
    let hobbies = req.query.hobbies;

    await Account_list.findOneAndUpdate({_id: id}, {
        firstName: firstName,
        lastName: lastName,
        sex: sex,
        mail: email,
        phone: phone,
        city: city,
        aboutMe: aboutMe,
        hobbies: hobbies,
    });

    res.send(true);
});

app.post('/create_account', async function(req, res) {
    let login = req.body.login;
    let password = req.body.password;
    let birth = req.body.date;
    let email = req.body.email;
    let phone = req.body.phone;

    let newData = new Account_list({
        login: login,
        password: password,
        firstName: '',
        lastName: '',
        sex: 'your__sex',
        birth: birth,
        mail: email,
        phone: phone,
        city: '',
        aboutMe: '',
        hobbies: '',
    });

    try {
        await newData.save();
        res.send(true);
    } catch (err) {
        res.send(false);
    };
});