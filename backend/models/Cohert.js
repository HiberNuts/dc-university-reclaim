const mongoose = require("mongoose");

const CohertSchema = mongoose.Schema({
    strapiId: {
        type: String,
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    startDate: {
        type: Date
    },
    cover: {
        type: String
    },
    video_url: {
        type: String
    },
    createdAt: { type: Date, required: true, default: Date.now },
    updatedAt: { type: Date, required: true, default: Date.now() }
})

const Cohert = mongoose.model("Cohert", CohertSchema);
module.exports = Cohert;