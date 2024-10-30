const mongoose = require('mongoose');

const externalCourseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    completion_ratio: {
        type: String,
    },
    image_480x270: {
        type: String,
    },
    wallet_address: {
        type: String,
    }
}, {
    timestamps: true
});

const ExternalCourse = mongoose.model('ExternalCourse', externalCourseSchema);

module.exports = ExternalCourse;
