var mongoose = require('mongoose');
var sizingSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    label: {
        type: String,
        required: true
    },
    mCPU: {
        type: String,
        required: true
    },
    u_mCPU: {
        type: String,
        required: true
    },
    RAM: {
        type: String,
        required: true
    },
    u_RAM: {
        type: String,
        required: true
    }
});
var Sizing = module.exports = mongoose.model('sizing', sizingSchema);
module.exports.get = function (callback, limit) {
    Sizing.find(callback).limit(limit);
}