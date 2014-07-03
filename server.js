var express = require('express');
var monsters = require('./data/monster.json');

var server = express();
server.use(express.static(__dirname + '/public'));
server.get("/bestiary", function(request, response){
            response.json(monsters);
          });


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

server.listen(server_port, server_ip_address, function() {
  console.log('Listening on ' + server_ip_address + ":" + server_port);
});
