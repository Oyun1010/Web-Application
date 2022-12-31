const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const cors = require('cors');
const async = require('async');
const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const URI = "mongodb+srv://Oyu:izFeje4dcxnDMazK@cluster.34qkho7.mongodb.net/income_expense?retryWrites=true&w=majority"

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const db = mongoose.connect(URI, connectionParams)
    .then(() => {
        console.info("Connected to the Database");
    })
    .catch((e) => {
        console.log("Error: ", e);
    });
mongoose.set('strictQuery', true);

app.use(express.static(__dirname));
app.use(cors({ origin: '*' }));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));


const User = require('./schema/user');
const Income = require('./schema/income');
const Expense = require('./schema/expense');
const Itypes = require('./schema/incomeTypes');
const Etypes = require('./schema/expenseTypes');


app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});

app.post('/login', function (request, response) {
    const { email, password } = request.body;
    console.log(email, password);
    User.findOne({ email: email, password: password }, function (err, data) {
        if (err) console.log("Not found");
        else response.status(200).send(data);
    });
});
app.post('/register',  function (request, response) {

    const create = new User(request.body);

    try {
        create.save();
        response.status(200).json({
            "message": "successfull"
        });
        return "succ";
    }
    catch {

    }

});
app.get('/user/:id', function (request, response) {
    const id = request.params.id;
    User.find({ _id: id }, function (err, data) {
        if (err) console.log("err");
        else response.status(200).send(data);
    });
})
app.get('/all/:id', function (request, response) {
    const id = request.params.id;
    MongoClient.connect(URI, function (err, con) {
        if (err) throw err;
        const db = con.db('income_expense');
        db.collection('incomes').aggregate([
            {
                $lookup:
                {
                    from: 'expenses',
                    localField: 'user_id',
                    foreignField: id,
                    as: 'alls'
                }
            }
        ]).toArray()
            .then(res => {
                res.forEach(order => console.log(JSON.stringify(order)));
            }).catch(err => {
                console.log("Error: Update unsuccessfull.")
            }).finally(() => {
                con.close();
            })

    });
    // Income.aggregate([
    //     {
    //         $lookup: {
    //             from: 'expenses',
    //             localField: id,
    //             foreignField: id,
    //             as: 'all'
    //         }
    //     }
    // ]).toArray()
    // .then(res => {
    //   res.forEach(order => console.log(JSON.stringify(order)));
    // }).catch(err => {
    //   console.log("Error: Update unsuccessfull.")
    // }).finally(() => {
    //   con.close();
    // })



})
app.get('/incomes/:id', function (request, response) {
    const id = request.params.id;
    Income.find({ user_id: id }, function (err, data) {
        if (err) console.log(err);
        else response.status(200).send(data);
    })

});
app.get('/expenses/:id', function (request, response) {
    const id = request.params.id;
    Expense.find({ user_id: id }, function (err, data) {
        if (err) console.log(err);
        else response.status(200).send(data);
    })

});
app.get('/itypes', function (request, response) {
    Itypes.findOne(function (err, data) {
        if (err) console.log("");
        else response.status(200).send(data);
    })
});
app.get('/etypes', function (request, response) {
    Etypes.findOne(function (err, data) {
        if (err) console.log("");
        else response.status(200).send(data);
    })
});
app.post('/createIncome', async function (request, response) {
    const create = new Income(request.body);
    try {
        await create.save();
        response.status(200).json({
            "message": "successfull"
        });
    }
    catch {

    }
});

app.post('/createExpense', async function (request, response) {
    const create = new Expense(request.body);
    try {
        await create.save();
        response.status(200).json({
            "message": "successfull"
        });
    }
    catch {

    }
});


var server = app.listen(5000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});
