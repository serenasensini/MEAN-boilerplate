Request = require('../model/requestModel');

exports.index = function (req, res) {
    Request.get(function (err, requests) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Requests retrieved successfully",
            data: requests
        });
    });
};

exports.new = function (req, res) {
    var request = new Request();
    request.name = req.body.name ? req.body.name : request.name;
    request.description = req.body.description;
    request.owner = req.body.owner;
    request.customer = req.body.customer;
    request.scope = req.body.scope;
    request.high_availability = req.body.high_availability;
    request.monitoring = req.body.monitoring;
    request.environment = req.body.environment;
    request.logging = req.body.logging;
    request.database_type = req.body.database_type;
    request.components = req.body.components;

    request.results = getMinRequirements(req.body.components);

    console.log(request.results);

    request.date = new Date(Date.now());

    // request.save(function (err) {
    //     if (err)
    //         res.json(err);
    //     else
    res.json({
        message: 'New request created!',
        data: request
    });
    // });
};

exports.view = function (req, res) {
    Request.findById(req.params.request_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Request details loading..',
            data: contact
        });
    });
};

exports.update = function (req, res) {
    Request.findById(req.params.request_id, function (err, contact) {
        if (err)
            res.send(err);
        contact.name = req.body.name ? req.body.name : contact.name;
        contact.gender = req.body.gender;
        contact.email = req.body.email;
        contact.phone = req.body.phone;
        contact.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Request Info updated',
                data: contact
            });
        });
    });
};

exports.delete = function (req, res) {
    Request.remove({
        _id: req.params.request_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Request deleted'
        });
    });
};


// calculate the effective requirements
function getMinRequirements(components){
    let tot_cpu = 0, tot_ram = 0;
    for(let c of components)
    {
        tot_cpu = tot_cpu + parseInt(c.available_sizing[0].mCPU);
        tot_ram = tot_ram + parseInt(c.available_sizing[0].RAM);

    }

    console.log(tot_cpu);
    console.log(tot_ram);

    return [
        {
            tot_CPU: tot_cpu,
            tot_RAM: tot_ram,
            worker_nodes: "0",
            master_nodes: "0"
        }

    ];
}

// calculare the rendered requirements
function getRequirements(){

}
