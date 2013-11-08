var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DatapointSchema = new Schema({
        sensor: { type: Schema.Types.ObjectId, required: true },
        key: { type: Date, default: Date.now },
        value: { type: Schema.Types.Mixed, required: true }
    });

mongoose.model('Datapoint', DatapointSchema);
