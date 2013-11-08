var devices     = require('./v1/devices/');
var sensors     = require('./v1/sensors/');
var datapoints  = require('./v1/datapoints/');

module.exports = function(server) {
    server.get('/v1/devices', devices.multi);
    server.post('/v1/devices', devices.create);
    server.get('/v1/devices/:id', devices.read);
    server.put('/v1/devices/:id', devices.update);
    server.del('/v1/devices/:id', devices.remove);

    server.get('/v1/sensors', sensors.multi);
    server.post('/v1/sensors', sensors.create);
    server.get('/v1/sensors/:id', sensors.read);
    server.put('/v1/sensors/:id', sensors.update);
    server.del('/v1/sensors/:id', sensors.remove);

    server.get('/v1/datapoints', datapoints.multi);
    server.post('/v1/datapoints', datapoints.create);
    server.get('/v1/datapoints/:id', datapoints.read);
    server.del('/v1/datapoints/:id', datapoints.remove);
};
