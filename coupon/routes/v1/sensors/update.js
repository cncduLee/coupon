var restify = require('restify');
var Models  = require('../../../models/');
var Sensor  = Models.Sensor;
var Hint    = require('../../../libs/hint');

module.exports = function(req, res, next) {
    var sensor = {};

    sensor.update_at = Date.now();

    if (req.params.id.length !== 24) {
		return next(new restify.InvalidArgumentError(Hint.InvalidResourceID));
    }

    if (req.body && req.body.device) {
        if (req.body.device.length !== 24) {
            return next(new restify.InvalidArgumentError(Hint.InvalidDeviceResourceID));
        }

        sensor.device = req.body.device;
    }

    if (req.body && req.body.name) {
        sensor.name = req.body.name;
    }

    if (req.body && req.body.location) {
        sensor.location = req.body.location;
    }

    if (req.body && req.body.description) {
        sensor.description = req.body.description;
    }

    if (req.body && req.body.unit) {
        sensor.unit = req.body.unit;
    }

	Sensor.update({
        _id: req.params.id,

    }, sensor, function(err, length) {
        if (err) {
            return next(err);
        }

        if (!length) {
		    return next(new restify.InvalidArgumentError(Hint.ResourceNotFound));
        }

        res.send(200);

        next();
    });
};
