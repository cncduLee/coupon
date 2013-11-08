var _       = require('underscore');
var Models  = require('../../../models/');
var Device  = Models.Device;

/**
 * 1、获取所有：无参数
 * 2、根据name获取设备：name1,name2.....[任意个数]
 * 3、根据_id获取设备：_id1,_id2.....[任意个数]
 */
module.exports = function(req, res, next) {
	var query = {};

	if (_.isBoolean(req.query.is_public)) {
		query.is_public = req.query.is_public;
	}

	if (_.isBoolean(req.query.status)) {
        query.status = req.query.status;
    }

	if (req.query.name) {
		var names = req.query.name.split(',');
		query.name = {$in:names};
	}

	if(req.query._id) {
		var ids = req.query._id.split(',');
		query._id = {$in:ids};
	}
		
	Device.find(query, function(err, devices) {
		if (err) {
            return next(err);
        }

        res.send(devices);

		next();
	});
};
