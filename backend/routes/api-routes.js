let router = require('express').Router();
router.get('/', function (req, res) {
    res.json({
        status: 'API is working',
        message: 'Welcome to webapp crafted with love!',
    });
});
var componentController = require('../controllers/componentController');
router.route('/components')
    .get(componentController.index)
    .post(componentController.new);

router.route('/components/:component_id')
    .get(componentController.view)
    .put(componentController.update)
    .delete(componentController.delete);

var sizingController = require('../controllers/sizingController');
router.route('/sizings')
    .get(sizingController.index)
    .post(sizingController.new);

router.route('/sizings/:sizing_id')
    .get(sizingController.view)
    .put(sizingController.update)
    .delete(sizingController.delete);

var requestController = require('../controllers/requestController');
router.route('/requests')
    .get(requestController.index)
    .post(requestController.new);

router.route('/requests/:request_id')
    .get(requestController.view)
    .put(requestController.update)
    .delete(requestController.delete);


module.exports = router;