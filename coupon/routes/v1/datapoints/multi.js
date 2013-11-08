var restify     = require('restify');
var Models      = require('../../../models/');
var Datapoint   = Models.Datapoint;
var Hint        = require('../../../libs/hint');
var genTime     = require('../../../libs/date').genTime;

/**
 * 1、获取所有点数：无参数
 * 2、根据指定sensor的全部数据点
 * 3、根据时间地段获取指定sensor的数据点：from start to end of sensor
 * TODO: WHAT IS INTERVALE ????
 */
module.exports = function(req, res, next) {
	var query = {};

    if (req.query.sensor) {
        if (req.query.sensor.length !== 24) {
            return next(new restify.InvalidArgumentError(Hint.InvalidSensorResourceID));
        }

        query.sensor = req.query.sensor;
    }

    var start, end;
    if( req.query.start ) {
        start = genTime.str2date(req.query.start);
        if (start) {
            return next(new restify.InvalidArgumentError(Hint.FamtterError));
        }
    }
    if( req.query.end ) {
        end = genTime.str2date(req.query.end);
        if (end) {
            return next(new restify.InvalidArgumentError(Hint.FamtterError));
        }
    }

    if(start)
        query.key = {$gte:start};
    if(end)
        query.key = {$lte:end};
    if(start && end)
        query.key = {$gte:start,$lte:end};

    
    //console.log(query);

	Datapoint.find(query, function(err, datapoints) {
		if (err) {
            return next(err);
        }

        res.send(datapoints);

		next();
	});
};

//handler for results
function setInterval(datapoints,interval,is){
    if(interval){
        return null;
    }
    
    if(datapoints.length <= 1) {
        return datapoints;
    }

    var inter = paseInt(interval);
    var results = [];
    for( var item in datapoints) {

    }

};