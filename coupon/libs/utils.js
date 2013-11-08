var _ = require('underscore');

exports.genLocation = genLocation;

/**
 * 生成新的资源URI
 * @param: req <Request>
 * @param: id  <ObjectId>
 */
function genLocation(req, id) {
    console.log(req);
    return req.headers.origin + req.url + '/' + id;
}
