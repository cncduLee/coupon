var restify = require('restify');
var Models  = require('../../../models/');
var Device  = Models.Device;
var Sensor  = Models.Sensor;
var utils   = require('../../../libs/utils');
var Hint    = require('../../../libs/hint');

module.exports = function(req, res, next) {
	if (!req.body) {
		return next(new restify.MissingParameterError(Hint.MissingParams));
	}

	if (req.body.device.length !== 24) {
		return next(new restify.InvalidArgumentError(Hint.InvalidDeviceResourceID));
	}

	if (!req.body.name) {
		return next(new restify.MissingParameterError(Hint.NameParameterNotFound));
	}

	if (!req.body.location) {
		return next(new restify.MissingParameterError(Hint.LocationParameterNotFound));
	}

	Models.exist(Device, {
        _id: req.body.device
    })
    .then(function(exist) {
        if (!exist) {
            next(new restify.InvalidArgumentError(Hint.DeviceResourceNotFound));
        }
        else {
            Sensor.create({
                device: req.body.device,
                name: req.body.name,
                location: req.body.location,
                unit: req.body.unit,
                description: req.body.description || ""

            }, function(err, sensor) {
                if (err) {
                    return next(err);
                }

                res.header('Location', utils.genLocation(req, sensor._id));
                res.send(sensor);

                next();
            });
        }
	})
    .fail(function(err) {
        next(err);
	});
};
