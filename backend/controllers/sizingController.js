Sizing = require('../model/sizingModel');
// Handle index actions
exports.index = function (req, res) {
    Sizing.get(function (err, sizings) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Sizings retrieved successfully",
            data: sizings
        });
    });
};
// Handle create sizing actions
exports.new = function (req, res) {
    var sizing = new Sizing();
    sizing.name = req.body.name ? req.body.name : sizing.name;
    sizing.label = req.body.label;
    sizing.mCPU = req.body.mCPU;
    sizing.u_mCPU = req.body.u_mCPU;
    sizing.RAM = req.body.RAM;
    sizing.u_RAM = req.body.u_RAM;
// save the sizing and check for errors
    sizing.save(function (err) {
        // Check for validation error
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New sizing created!',
                data: sizing
            });
    });
};
// Handle view sizing info
exports.view = function (req, res) {
    Sizing.findById(req.params.sizing_id, function (err, sizing) {
        if (err)
            res.send(err);
        res.json({
            message: 'Sizing details loading..',
            data: sizing
        });
    });
};
// Handle update sizing info
exports.update = function (req, res) {
    Sizing.findById(req.params.sizing_id, function (err, sizing) {
        if (err)
            res.send(err);
        sizing.name = req.body.name ? req.body.name : sizing.name;
        sizing.gender = req.body.gender;
        sizing.email = req.body.email;
        sizing.phone = req.body.phone;
// save the sizing and check for errors
        sizing.save(function (err) {
            if (err)
                res.json(err);
            res.json({
                message: 'Sizing Info updated',
                data: sizing
            });
        });
    });
};
// Handle delete sizing
exports.delete = function (req, res) {
    Sizing.remove({
        _id: req.params.sizing_id
    }, function (err, sizing) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Sizing deleted'
        });
    });
};