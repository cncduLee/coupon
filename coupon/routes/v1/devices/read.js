var restify = require('restify');
var Models  = require('../../../models/');
var Device  = Models.Device;
var Hint    = require('../../../libs/hint');

module.exports = function(req, res, next) {

	if (req.params.id.length !== 24) {
		return next(new restify.InvalidArgumentError(Hint.InvalidResourceID));
	}

	Device.findOne({
		_id: req.params.id

	}, function(err, device) {
		if (err) {
		    return next(err);
		}

		if (!device) {
            return next(new restify.ResourceNotFoundError(Hint.ResourceNotFound));
		}

		res.send(device);

		next();
	});
};
