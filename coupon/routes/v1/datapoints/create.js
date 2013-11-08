var restify     = require('restify');
var Models      = require('../../../models/');
var Device      = Models.Device;
var Sensor      = Models.Sensor;
var Datapoint   = Models.Datapoint;
var utils       = require('../../../libs/utils');
var Hint        = require('../../../libs/hint');

module.exports = function(req, res, next) {
	if (!req.body) {
		return next(new restify.MissingParameterError(Hint.MissingParams));
	}

	if (!req.body.sensor || req.body.sensor.length !== 24) {
		return next(new restify.MissingParameterError(Hint.InvalidSensorResourceID));
	}

	if (!req.body.value) {
		return next(new restify.MissingParameterError(Hint.DatapointParameterNotFound));
	}

    Models.exist(Sensor, {_id: req.body.sensor}).then(function() {
        Datapoint.create({
            sensor: req.body.sensor,
            value: req.body.value

        }, function(err, datapoint) {
            if (err) {
                return next(err);
            }

            res.header('Location', utils.genLocation(req, datapoint._id));
            res.send(datapoint);

            next();
        });

    }, function() {
        next(new restify.ResourceNotFoundError(Hint.SensorResourceNotFound));
    });
};
