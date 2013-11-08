var restify     = require('restify');
var Models      = require('../../../models/');
var Datapoint   = Models.Datapoint;
var Hint        = require('../../../libs/hint');

module.exports = function(req, res, next) {

	if (req.params.id.length !== 24) {
		return next(new restify.InvalidArgumentError(Hint.InvalidResourceID));
	}

	Datapoint.findOne({
		_id: req.params.id,

	}, function(err, datapoint) {
		if (err) {
            return next(err);
		}

		if (!datapoint) {
            return next(new restify.ResourceNotFoundError(Hint.ResourceNotFound));
		}

		res.send(datapoint);

		next();
	});
};
