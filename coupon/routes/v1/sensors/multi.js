var Models = require('../../../models/');
var Sensor = Models.Sensor;
/**
 * 1、获取所有：无参数
 * 2、根据name获取设备：name1,name2.....[任意个数]
 * 3、根据_id获取设备：_id1,_id2.....[任意个数]
 */
module.exports = function(req, res, next) {
	var query = {};

    if (req.query.device) {
        if (req.query.device.length !== 24) {
            return next(new restify.InvalidArgumentError(Hint.InvalidDeviceResourceID));
        }

        query.device = req.query.device;
    }

	if (req.query.name) {
		var names = req.query.name.split(',');
		query.name = {$in:names};
	}

	if(req.query._id) {
		var ids = req.query._id.split(',');
		query._id = {$in:ids};
	}

	Sensor.find(query, function(err, sensors) {
		if (err) {
            return next(err);
		}

        res.send(sensors);

		next();
	});
};
