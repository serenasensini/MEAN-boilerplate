var mongoose = require('mongoose');
var componentSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    available_sizing: [
        {
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
        }
    ]

});
var Component = module.exports = mongoose.model('component', componentSchema);
module.exports.get = function (callback, limit) {
    Component.find(callback).limit(limit);
}