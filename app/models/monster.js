// app/models/monster.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var monsterSchema = new Schema({
    name: String,
    type: String,
    ac: Number,
    hp: String,
    speed: String,
    senses: String,
    stats: {
        str: String,
        dex: String,
        con: String,
        int: String,
        wis: String,
        cha: String
    },
    alignment: String,
    languages: [String],
    traits: [{
        name: String,
        desc: String
    }],
    actions: [{
        name: String,
        desc: String
    }],
    encounter_building: {
        level: String,
        xp: Number
    }
});

module.exports = mongoose.model('Monster', monsterSchema);