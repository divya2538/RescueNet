async function sendSMS({ to, message }) {

    console.log("🚨 MOCK SMS SENT");
    console.log("TO:", to);
    console.log("MESSAGE:", message);

    return {
        sid: "MOCK_SMS_ID_12345",
        status: "SIMULATED"
    };
}

module.exports = { sendSMS };