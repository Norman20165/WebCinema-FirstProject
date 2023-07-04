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
    }, birth: {
        type: String,
        required: false,
    }, mail: {
        type: String,
        required: false,
    }, phone: {
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

app.post('/create_account', async function(req, res) {
    let login = req.body.login;
    let password = req.body.password;
    let birth = req.body.date;
    let email = req.body.email;
    let phone = req.body.phone;

    let newData = new Account_list({
        login: login,
        password: password,
        birth: birth,
        mail: email,
        phone: phone,
    });

    try {
        await newData.save();
        res.send(true);
    } catch (err) {
        res.send(false);
    };
});

// function otherData(data, additionalData) {
//     let array = [];
//     let arrayOne = data._id;
//     for (let i = 0; i < additionalData.length; i++) {
//         array.push(additionalData[i]._id);
//     };

//     let necessaryId = [];

//     let undefinedError = true;
//     let totalError = 0;

//     for (let i = 0; i < array.length; i++) {
//         if (String(array[i]) == String(arrayOne)) {
//             for (let j = 0; j < 6; j++) {
//                 if (array[i + j + 1] == undefined) {
//                     undefinedError = true;
//                     totalError += 1;
//                 } else {
//                     necessaryId.push(array[i + j + 1]);
//                 };
//             };
//             break;
//         };
//     };

//     if (undefinedError) {
//         for (let i = 0; i < totalError; i++) {
//             necessaryId.push(array[i]);
//         };
//     };

//     return necessaryId;
// };

// app.get('/index', async function(req, res) {
//     let id = req.query.id;
    
//     if (!id) {
//         res.render('error');
//         return;
//     };

//     let data = await Film_list.findOne({_id: id});
//     let additionalData = await Film_list.find();

//     let requireId = otherData(data, additionalData);

//     let necessaryData = [];

//     for (let i = 0; i < requireId.length; i++) {
//         necessaryData.push(await Film_list.findOne({_id: requireId[i]}));
//     };

//     res.render('render_index', {
//         data: data,
//         otherData: requireId,
//         necessaryData: necessaryData,
//         index: true,
//         accountStatus: accountStatus,
//     });
// });

// app.get('/rating', async function(req, res) {
//     let id = req.query.id;
    
//     if (!id) {
//         res.render('error');
//         return;
//     };

//     let data = await Ratings_list.findOne({_id: id});
//     let additionalData = await Ratings_list.find();

//     let requireId = otherData(data, additionalData);

//     let necessaryData = [];

//     for (let i = 0; i < requireId.length; i++) {
//         necessaryData.push(await Ratings_list.findOne({_id: requireId[i]}));
//     };

//     res.render('render_index', {
//         data: data,
//         otherData: requireId,
//         necessaryData: necessaryData,
//         index: false,
//     });
// });

// app.get('/sign_up', async function(req, res) {
//     res.render('sign_up');
// });

// app.post('/registration', async function(req, res) {
//     let login = req.body.login;
//     let password = req.body.password;
//     let birth = req.body.date;
//     let email = req.body.email;
//     let phone = req.body.phone__number;

//     let data = await Account_list.findOne({login: login});

//     if (data) {
//         res.render('sign_up', {
//             newPassword: password,
//             newBirth: birth,
//             newEmail: email,
//             newPhone: phone,
//             isinvalid: true,
//         });
//     } else {
//         let newData = new Account_list({
//             login: login,
//             password: password,
//             birth: birth,
//             mail: email,
//             phone: phone,
//         });

//         try {
//             await newData.save();
//             let someData = await Account_list.findOne({login: login});
//             res.redirect(`/avatar?id=${someData._id}`);
//         } catch (err) {
//             res.render('error', {
//                 text: `Неизвестная ошибка ${err}`,
//             })
//         };
//     }
// });