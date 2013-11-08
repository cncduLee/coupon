var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SensorSchema = new Schema({
        device: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        description: { type: String },
        unit: { type: Schema.Types.Mixed },
        location: { type: Schema.Types.Mixed, required: true },
        create_at: { type: Date, default: Date.now },
        update_at: { type: Date, default: Date.now }
    });

mongoose.model('Sensor', SensorSchema);
