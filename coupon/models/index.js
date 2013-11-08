var mongoose = require('mongoose');
var config = require('node-conf').load(process.env.NODE_ENV);
var Q = require('q');

mongoose.connect(config.db.url, function(err) {
    if (err) {
        console.error('connect to %s error: ', config.db, err.message);
        process.exit(1);
    }
});

require('./device');
require('./sensor');
require('./datapoint');

exports.Device = mongoose.model('Device');
exports.Sensor = mongoose.model('Sensor');
exports.Datapoint = mongoose.model('Datapoint');

exports.exist = function(model, query) {
    var deferred = Q.defer();

    model.findOne(query, function(err, data) {
        if (err) {
            deferred.reject(err);
        }
        else {
            deferred.resolve(!!data);
        }
    });

    return deferred.promise;
};
