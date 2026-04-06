const mongoose = require('mongoose');

const checkerCounterSchema = new mongoose.Schema({
    name: { type: String, unique: true },
    seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('checker_counter', checkerCounterSchema);

module.exports = Counter;
