/**
 * Created by lschroeder on 7/9/2014.
 */

/**
 * Created by lschroeder on 7/9/2014.
 * Contains all the bestiary applicable routes
 */

module.exports = function(app){

    var Spell     = require('../models/spell');

    // create a spellbook (accessed at POST /spellbook)
    app.post('/spellbook', function(req, res) {

        var spells = [];
        var msg = [];
        for (var s in req.body)
        {
            var spell = new Spell();
            for (var key in req.body[s]) {
                spell[key] = req.body[key];
            }
            spell.save(function(err) {
                if (err)
                    msg.push(err)
                else
                    msg.push("Spell created - " + spell.name);
            });
        }
        // save the spell and check for errors
        res.json({ message: msg });
    });

    // create a spell (accessed at POST /spellbook/spell)
    app.post('/spellbook/spell', function(req, res) {

        var spell = new Spell();
        for (var key in req.body)
        {
            spell[key] = req.body[key];
        }
        console.log("Adding new spell - " + spell.name)
        // save the spell and check for errors
        spell.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Spell created!' });
        });

    });

    // get all the spells (accessed at GET /spellbook/spell)
    app.get('/spellbook/spell', function(req, res) {
        Spell.find(function(err, spells)
        {
            if (err)
                res.send(err);
            res.json(spells);
        })
    });

    app.get('/spellbook/spell/:spell_id', function(req,res){
        Spell.findById(req.params.spell_id,function(err,spell){
            if (err)
                res.send(err);
            res.json(spell);
        });
    });

    app.put('/spellbook/spell/:spell_id', function(req,res){
        Spell.findById(req.params.spell_id, function(err, spell){
            if (err)
                res.send(err);
            for (var key in req.body)
            {
                spell[key] = req.body[key];
            }
            spell.save(function(err){
                if (err)
                    res.send(err);

                res.json({message: 'Spell updated'});
            });
        });
    });

    app.delete('/spellbook/spell/:spell_id', function(req, res) {
        Spell.remove({
            _id: req.params.spell_id
        }, function(err, spell) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' + spell.name });
        });
    });
};