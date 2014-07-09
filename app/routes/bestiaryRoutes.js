/**
 * Created by lschroeder on 7/9/2014.
 * Contains all the bestiary applicable routes
 */

module.exports = function(app){

    var Monster     = require('../models/monster');

    // create a monster (accessed at POST /bestiary/monster)
    app.post('/bestiary/monster', function(req, res) {

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

    });

        // get all the monsters (accessed at GET /bestiary/monster)
    app.get('/bestiary/monster', function(req, res) {
        Monster.find(function(err, monsters)
        {
            if (err)
                res.send(err);
            res.json(monsters);
        })
    });

    app.get('/bestiary/monster/:monster_id', function(req,res){
        Monster.findById(req.params.monster_id,function(err,monster){
            if (err)
                res.send(err);
            res.json(monster);
        });
    });

    app.put('/bestiary/monster/:monster_id', function(req,res){
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
    });

    app.delete('/bestiary/monster/:monster_id', function(req, res) {
        Monster.remove({
            _id: req.params.monster_id
        }, function(err, monster) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });
};