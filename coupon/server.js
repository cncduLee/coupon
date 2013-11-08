/**
 *	Server
 */

var fs                  = require('fs');
var path                = require('path');
var config              = require('node-conf').load(process.env.NODE_ENV);
var restify             = require('restify');
var bunyan              = require('bunyan');
var routes              = require('./routes/');
var rewriteResponseSend = require('./libs/rewrite_response_send');
var server;


if (!fs.existsSync(config.log.path)) {
    fs.mkdirSync(config.log.path);
}


server = restify.createServer({
    name: config.name,
    version: config.version || '1.0.0'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.authorizationParser());
server.use(restify.dateParser());
server.use(restify.queryParser({mapParams:false}));
server.use(restify.bodyParser({mapParams:false}));
server.use(restify.jsonp());
server.use(restify.gzipResponse());
server.use(restify.conditionalRequest());
server.use(restify.CORS());
server.use(restify.fullResponse());
server.use(rewriteResponseSend);
server.get(/^\/[^\.]+\.html|js/, restify.serveStatic({
    'directory': './public'
}));
routes(server);
server.on('after', restify.auditLogger({
    log: bunyan.createLogger({
        name: config.name,
        streams: [
            { path: path.join(config.log.path, config.log.file) }
        ]
    })
}));


server.listen(config.port, function() {
    console.log('%s lisenting at %s', server.name, server.url);
});


exports.app = server;
