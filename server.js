var express     = require('express');
var bodyParser  = require('body-parser');
var monsters    = require('./data/monster.json');
var mongoose    = require('mongoose');
var Monster     = require('./app/models/monster');


//mongoose.connect('mongodb://localhost/dnd5e');
mongoose.connect('mongodb://admin:yfEI1HqrMsDw@dnd5e-striderls7.rhcloud.com/dnd5e');

var server = express();
server.use(express.static(__dirname + '/public'));
server.use(bodyParser.json());

var router = express.Router();

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Beastiary is called - ' + req.host);
    next(); // make sure we go to the next routes and don't stop here
});

router.get("/bestiary", function(request, response){
            response.json(monsters);
          });

router.route('/monster')

    // create a monster (accessed at POST http://localhost:8080/bestiary/monster)
    .post(function(req, res) {

        var monster = new Monster();
        for (var key in req.body)
        {
            monster[key] = req.body[key];
        }
        console.log("Adding new monster - " + monster.name)
        // save the bear and check for errors
        monster.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Monster created!' });
        });

    })

    // get all the monsters (accessed at GET http://localhost:8080/bestiary/monster)
    .get(function(req, res) {
        Monster.find(function(err, monsters)
        {
            if (err)
                res.send(err);
            res.json(monsters);
        })
    });

router.route('/monster/:monster_id')
    .get(function(req,res){
        Monster.findById(req.params.monster_id,function(err,monster){
            if (err)
            res.send(err);
            res.json(monster);
        });
    })

    .put(function(req,res){
        Monster.findById(req.params.monster_id, function(err, monster){
            if (err)
                res.send(err);
            for (var key in req.body)
            {
                monster[key] = req.body[key];
            }
            monster.save(function(err){
                if (err)
                    res.send(err);

                res.json({message: 'Monster updated'});
            });
        });
    })

    .delete(function(req, res) {
        Monster.remove({
            _id: req.params.monster_id
        }, function(err, monster) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

server.use('/bestiary', router)


var server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080
var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'

server.listen(server_port, server_ip_address, function() {
  console.log('Listening on ' + server_ip_address + ":" + server_port);
});
