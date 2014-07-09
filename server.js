var express     = require('express');
var bodyParser  = require('body-parser');
var monsters    = require('./data/monster.json');
var mongoose    = require('mongoose');


var connection_string = '127.0.0.1:27017/dnd5e';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}

var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

mongoose.connect(connection_string);

var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var router = express.Router();

// middleware to use for all requests
app.use(function(req, res, next) {
    // do logging
    console.log('Service at ' + req.path + ' called from ' + req.ip);
    next();
});

//Load my other routes
require('./app/routes/bestiaryRoutes')(app);

for (var o in app._router.stack)
{
    console.log(app._router.stack[o]);
}

//console.log(app);

app.use(function(err,req,res,next)
{
    res.send(err);
});

app.listen(server_port, server_ip_address, function() {
  console.log('Listening on ' + server_ip_address + ":" + server_port);
});
