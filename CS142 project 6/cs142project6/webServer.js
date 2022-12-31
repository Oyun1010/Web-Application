var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
const cors = require('cors');

var async = require('async');

var express = require('express');
const bodyParser = require('body-parser')
var app = express();

var User = require('./schema/user.js');
var Photo = require('./schema/photo.js');
var SchemaInfo = require('./schema/schemaInfo.js');

mongoose.connect('mongodb://127.0.0.1:27017/cs142project6', { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if(err) console.log("Error")
    else console.log("Connected database")
});

app.use(express.static(__dirname));
app.use(cors({origin: '*'}));
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function (request, response) {
    response.send('Simple web server of files from ' + __dirname);
});


app.get('/test/:p1', function (request, response) {
    console.log('/test called with param1 = ', request.params.p1);
    var param = request.params.p1 || 'info';

    if (param === 'info') {
        SchemaInfo.find({}, function (err, info) {
            if (err) {
                console.error('Doing /user/info error:', err);
                response.status(500).send(JSON.stringify(err));
                return;
            }
            if (info.length === 0) {
                response.status(500).send('Missing SchemaInfo');
                return;
            }
            console.log('SchemaInfo', info[0]);
            response.end(JSON.stringify(info[0]));
        });
    } else if (param === 'counts') {
        var collections = [
            {name: 'user', collection: User},
            {name: 'photo', collection: Photo},
            {name: 'schemaInfo', collection: SchemaInfo}
        ];
        async.each(collections, function (col, done_callback) {
            col.collection.countDocuments({}, function (err, count) {
                col.count = count;
                done_callback(err);
            });
        }, function (err) {
            if (err) {
                response.status(500).send(JSON.stringify(err));
            } else {
                var obj = {};
                for (var i = 0; i < collections.length; i++) {
                    obj[collections[i].name] = collections[i].count;
                }
                response.end(JSON.stringify(obj));

            }
        });
    } else {
        // If we know understand the parameter we return a (Bad Parameter) (400) status.
        response.status(400).send('Bad param ' + param);
    }
});

app.get('/user/list', function (request, response) {
    User.find((err, data) => {
        if(err) console.log(err)
        else response.status(200).send(data);
    });    
});

app.get('/user/:id', function (request, response) {
    var id = request.params.id;
    User.find({_id:id}, function(err, data) {
        if(err) console.log(err);
        else  response.status(200).send(data);
    })
   
});

app.get('/photosOfUser/:id', function (request, response) {
    var id = request.params.id;
    Photo.find({user_id:id}, function(err, data){
        if(err) console.log(err);
        else response.status(200).send(data);
    })
});
app.get('/photor/:id', function (request, response) {
    var id = request.params.id;
    Photo.findof({user_id:id}, function(err, data){
        if(err) console.log(err);
        else response.status(200).send(data);
    })
});

app.post('/insert/:id', async function (request, response) {
    const photoId = request.params.id;
    console.log(photoId);
    console.log(request.body);

    try {
        Photo.findOneAndUpdate(
            {
                _id: photoId
            }, 
            {
                $push: {
                    comments: request.body
                }
            }, function(err, succ) {
                if(err) console.log("err");
                else console.log("succ");
            });
        response.status(200).json({"message": "successfull"});
    }
    catch {

    }
    
   
      
        


  
});

var server = app.listen(5000, function () {
    var port = server.address().port;
    console.log('Listening at http://localhost:' + port + ' exporting the directory ' + __dirname);
});


