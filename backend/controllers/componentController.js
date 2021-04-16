Component = require('../model/componentModel');

exports.index = function (req, res) {
    Component.get(function (err, components) {
        if (err) {
            res.json({
                status: "error",
                message: err,
            });
        }
        res.json({
            status: "success",
            message: "Components retrieved successfully",
            data: components
        });
    });
};
// Handle create contact actions
exports.new = function (req, res) {
    var component = new Component();
    component.name = req.body.name ? req.body.name : component.name;
    component.description = req.body.description;
    // TODO: add list
    component.save(function (err) {
        if (err)
            res.json(err);
        else
            res.json({
                message: 'New component created!',
                data: component
            });
    });
};

exports.view = function (req, res) {
    Component.findById(req.params.component_id, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            message: 'Component details loading..',
            data: contact
        });
    });
};

exports.update = function (req, res) {
    Component.findById(req.params.component_id, function (err, contact) {
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
                message: 'Component Info updated',
                data: contact
            });
        });
    });
};

exports.delete = function (req, res) {
    Component.remove({
        _id: req.params.component_id
    }, function (err, contact) {
        if (err)
            res.send(err);
        res.json({
            status: "success",
            message: 'Component deleted'
        });
    });
};