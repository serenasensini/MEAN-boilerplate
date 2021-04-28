// STEP 1: definire modello
var mongoose = require('mongoose');
var requestSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String

});
var Request = module.exports = mongoose.model('request', requestSchema);
module.exports.get = function (callback, limit) {
    Request.find(callback).limit(limit);
}
