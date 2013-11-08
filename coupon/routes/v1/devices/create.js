var restify = require('restify');
var Models  = require('../../../models/');
var Device  = Models.Device;
var Hint    = require('../../../libs/hint');
var utils   = require('../../../libs/utils');

module.exports = function(req, res, next) {
	if (!req.body) {
		return next(new restify.MissingParameterError(Hint.MissingParams));
	}

	if (!req.body.name) {
		return next(new restify.MissingParameterError(Hint.NameParameterNotFound));
	}

	if (!req.body.location) {
		return next(new restify.MissingParameterError(Hint.LocationParameterNotFound));
	}

	Device.create({
		name: req.body.name,
		location: req.body.location,
		description: req.body.description || '',
		is_public: req.body.is_public || false,
        status: req.body.status || 1

	}, function(err, device) {
    	if (err) {
            return next(err);
		}

        res.header('Location', utils.genLocation(req, device._id));
        res.send(device);

		next();
    });
};
