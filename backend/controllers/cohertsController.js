const db = require("../models");
const { formatResponse } = require('../utils/formatResponse');

const Coherts = db.Coherts;


exports.createCohert = async (req, res) => {
    try {

        if (req.body.event != "entry.publish" || req.body.model != "cohert")
            return res.status(200);
        console.log("Calling cohert create webhook")
        const existingCohert = await Coherts.findOne({ strapiId: req.body.entry.id });
        if (existingCohert) {
            console.log("Cohert already exixts.")
            return res.status(500)
        }
        else {
            const cohert = req.body.entry;
            const newCohert = new Coherts({
                strapiId: cohert.id,
                title: cohert.title ?? '',
                description: cohert.description ?? '',
                category: cohert?.category ?? '',
                startDate: cohert?.startDate ?? '',
                cover: cohert?.cover?.url ?? '',
                video_url: cohert.video_url
            })

            await newCohert.save();
            console.log("New Cohert Saved[+].")
        }
        res.status(200)
    } catch (error) {
        console.log("ERRRO CREATING COHERT WEBHOOK:", error.message);
        res.status(500).send(formatResponse(500, "Internal Server Error"));
    }
}
exports.updateCohert = async (req, res) => {
    try {

        if (req.body.event != "entry.update" || req.body.model != "cohert")
            return res.status(200);
        const existingCohert = await Coherts.findOne({ strapiId: req.body.entry.id });
        if (!existingCohert) {
            return res.status(404)
        }
        const updatedCohert = req.body.entry;
        existingCohert.title = updatedCohert.title ?? '';
        existingCohert.description = updatedCohert.description ?? '';
        existingCohert.startDate = updatedCohert.startDate ?? '';
        existingCohert.category = updatedCohert.category ?? '';
        existingCohert.cover = updatedCohert.cover?.url ?? ''
        existingCohert.video_url = updatedCohert.video_url ?? '';

        await existingCohert.save();
        console.log("Cohert Updated [+]");
        res.status(200);
    } catch (error) {
        console.log("ERRRO UPDATING COHERT WEBHOOK: ", error?.message);
        res.status(500).send(formatResponse(500, "Internal Server Error"));
    }
}