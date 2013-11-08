/**
 *  自定义返回对象字段
 */
var _ = require('underscore');

module.exports = function(args, req, res) {
    if (_.isObject(args[0])) {
        args[0] = filter(args[0], req.query.fields);
    }
};

/**
 *  筛选fields里的所有字段
 *      @param: item <Object|Array>
 *      @param: fields <Array>
 */
function filter(item, fields) {
    var result, i, l, k;

    if (!fields) {
        return item;
    }

    if (_.isArray(item)) {
        return _.map(item, function(item) {
            return filter(item, fields);
        });
    }

    if (_.isObject(item)) {
        return _.pick(item, fields.split(','));
    }

    return item;
}
