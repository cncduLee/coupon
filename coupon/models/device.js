var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DeviceSchema = new Schema({
        name: { type: String, required: true },
        location: { type: Schema.Types.Mixed, required: true },
        description: { type: String },
        is_public: { type: Boolean, default: false },
        status: { type: Number, default: 1 },
        create_at: { type: Date, default: Date.now },
        update_at: { type: Date, default: Date.now }
    });

mongoose.model('Device', DeviceSchema);
