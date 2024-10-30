const ExternalCourse = require('../models/ExternalCourses');

module.exports = function (app) {
    // app.use(function (req, res, next) {
    //     res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    //     next();
    // });

    // Example curl command:
    // curl -X POST http://localhost:3000/api/external-courses \
    //   -H "Content-Type: application/json" \
    //   -d '{
    //     "title": "Course Title",
    //     "completion_ratio": 75,
    //     "image_480x270": "https://example.com/course-image.jpg",
    //     "wallet_address": "0x123..."
    //   }'
    app.post("/api/external-courses", async (req, res) => {
        try {
            const { title, completion_ratio, image_480x270, wallet_address } = req.body;
            console.log("wallet_address", wallet_address)
            const externalCourse = new ExternalCourse({
                title,
                completion_ratio,
                image_480x270,
                wallet_address
            });

            const savedCourse = await externalCourse.save();
            res.status(201).json(savedCourse);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });

    app.get("/api/external-courses/:walletAddress", async (req, res) => {
        try {
            const walletAddress = req.params.walletAddress;
            const courses = await ExternalCourse.find({ wallet_address: walletAddress });
            
            if (!courses || courses.length === 0) {
                return res.status(404).json({ message: 'No courses found for this wallet address' });
            }

            res.json(courses);

        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    });
};
