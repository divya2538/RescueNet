const express = require("express");
const router = express.Router();

const { sendSMS } = require("../services/twilioService");

router.post("/send", async (req, res) => {
    try {
        const { contact, message } = req.body;

        const result = await sendSMS({
            to: contact,
            message
        });

        res.json({
            success: true,
            sid: result.sid
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            error: err.message
        });
    }
});

module.exports = router;