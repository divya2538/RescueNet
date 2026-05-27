const express = require("express");
const router = express.Router();

router.post("/trigger", (req, res) => {
    const { severity, latitude, longitude } = req.body;

    const riskLevel =
        severity === "CRITICAL" ? 95 :
        severity === "HIGH" ? 75 :
        severity === "MODERATE" ? 50 : 25;

    res.json({
        success: true,
        riskLevel,
        message: "Emergency analyzed"
    });
});

router.get("/status", (req, res) => {
    res.json({
        system: "ONLINE",
        responders: 42,
        activeEmergencies: 18
    });
});

module.exports = router;