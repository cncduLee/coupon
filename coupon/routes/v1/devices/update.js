var restify = require('restify');
var Models  = require('../../../models/');
var Device  = Models.Device;
var Hint    = require('../../../libs/hint');
var _       = require('underscore');

module.exports = function(req, res, next) {
    var device = {};

    device.update_at = Date.now();

	if (req.params.id.length !== 24) {
		return next(new restify.InvalidArgumentError(Hint.InvalidResourceID));
    }

    if (req.body && req.body.name) {
        device.name = req.body.name;
    }

    if (req.body && req.body.location) {
        device.location = req.body.location;
    }

    if (req.body && req.body.description) {
        device.description = req.body.description;
    }

    if (req.body && _.isBoolean(req.body.is_public)) {
        device.is_public = req.body.is_public;
    }

    if (req.body && req.body.status) {
        device.status = req.body.status;
    }

	Device.update({_id: req.params.id}, device, function(err, length) {
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
