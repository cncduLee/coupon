var restify = require('restify');
var Models  = require('../../../models/');
var Sensor  = Models.Sensor;
var Hint    = require('../../../libs/hint');

module.exports = function(req, res, next) {

    if (req.params.id.length !== 24) {
		return next(new restify.InvalidArgumentError(Hint.InvalidResourceID));
	}

	Sensor.remove({
        _id: req.params.id

    }, function(err, length) {
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
