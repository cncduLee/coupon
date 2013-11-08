/**
 * 重写Response Send方法，添加
 *  1. 自定义字段 =>  url?fields=field1,field2
 */

var Fields = require('./fields');

module.exports = function(req, res, next) {
    var send = res.send;

    res.send = function() {
        Fields(arguments, req, res);
        send.apply(this, arguments);
    };

    next();
};


