const express = require("express");
const router = express.Router();

let reports = [];

router.post("/add", (req, res) => {
    const report = {
        id: Date.now(),
        ...req.body,
        timestamp: new Date()
    };

    reports.push(report);

    res.json({
        success: true,
        report
    });
});

router.get("/all", (req, res) => {
    res.json({
        success: true,
        reports
    });
});

module.exports = router;