var restify = require('restify');
var Models  = require('../../../models/');
var Sensor  = Models.Sensor;
var Hint    = require('../../../libs/hint');

module.exports = function(req, res, next) {

	if (req.params.id.length !== 24) {
		return next(new restify.InvalidArgumentError(Hint.InvalidResourceID));
	}

	Sensor.findOne({
		_id: req.params.id

	}, function(err, sensor) {
		if (err) {
            return next(err);
		}

		if (!sensor) {
            return next(new restify.ResourceNotFoundError(Hint.ResourceNotFound));
		}

		res.send(sensor);

		next();
	});
};
