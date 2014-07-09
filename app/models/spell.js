// app/models/spell.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var spellSchema = new Schema({
    name: String,
    level: String,
    school: [String],
    ritual: Boolean,
    castingTime: String,
    range: String,
    verbal: Boolean,
    somatic: Boolean,
    material: String,
    duration: String,
    concentration: Boolean,
    desc: String
});

module.exports = mongoose.model('Spell', spellSchema);
