var mongoose = require('mongoose');
var requestSchema = mongoose.Schema({
    owner: {
        type: String,
        required: true
    },
    customer: {
        type: String,
        required: true
    },
    scope: {
        type: String,
        required: true
    },
    high_availability: {
        type: String,
        required: true
    },
    monitoring: {
        type: String,
        required: true
    },
    logging: {
        type: String,
        required: true
    },
    environment: {
        type: String,
        required: true
    },
    database_type: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    components: [],
    date:{
        type: Date,
        default: Date.now
    },
    results:[
        {
            tot_CPU: {
                type: String
            },
            tot_RAM: {
                type: String
            },
            worker_nodes:{
                type: String
            },
            master_nodes:{
                type: String
            }
        }

    ]

});
var Request = module.exports = mongoose.model('request', requestSchema);
module.exports.get = function (callback, limit) {
    Request.find(callback).limit(limit);
}
