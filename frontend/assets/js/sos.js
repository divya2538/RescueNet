// =========================
// RESCUENET SOS SYSTEM
// =========================

const sosBtn      = document.getElementById("sosButton");
const floatingSOS = document.getElementById("floatingSOS");
const statusBox   = document.getElementById("sosStatus");
const progressFill = document.getElementById("sosProgressFill");

function setStatus(msg, color = "#94a3b8") {
    if (statusBox) {
        statusBox.innerText   = msg;
        statusBox.style.color = color;
    }
}

function setProgress(pct) {
    if (progressFill) progressFill.style.width = pct + "%";
}

// =========================
// CORE SOS TRIGGER
// =========================

function triggerSOS() {
    const contact  = document.getElementById("emergencyContact")?.value.trim();
    const severity = document.getElementById("severitySelect")?.value || "CRITICAL";

    if (!contact) {
        setStatus("⚠ Please enter an emergency contact number.", "#ffae00");
        return;
    }

    setStatus("📡 Detecting your location...", "#00e5ff");
    setProgress(20);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(6);
                const lng = position.coords.longitude.toFixed(6);
                const acc = Math.round(position.coords.accuracy);

                setStatus("✅ Location found. Sending SOS...", "#00ff95");
                setProgress(70);

                sendWhatsApp(contact, severity, lat, lng, acc);
            },
            (error) => {
                setStatus("⚠ Location unavailable. Sending SOS without GPS...", "#ffae00");
                setProgress(60);
                sendWhatsApp(contact, severity, null, null, null);
            },
            {
                enableHighAccuracy: true,
                timeout: 8000,
                maximumAge: 0
            }
        );
    } else {
        setStatus("⚠ GPS not supported. Sending SOS...", "#ffae00");
        setProgress(60);
        sendWhatsApp(contact, severity, null, null, null);
    }
}

// =========================
// BUILD & SEND WHATSAPP
// =========================

function sendWhatsApp(contact, severity, lat, lng, accuracy) {

    const time = new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
    });

    const severityEmoji = {
        LOW:      "🟡",
        MODERATE: "🟠",
        CRITICAL: "🔴"
    }[severity] || "🔴";

    // Build location block
    let locationBlock = "";

    if (lat && lng) {
        const staticMap = `https://maps.google.com/?q=${lat},${lng}`;
        const liveTrack = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;

        locationBlock =
`📍 *LIVE LOCATION*
Lat  : ${lat}
Long : ${lng}
Acc  : ~${accuracy} meters

🗺 Open in Maps    : ${staticMap}
🔴 Real-time Track : ${liveTrack}`;
    } else {
        locationBlock =
`📍 *LOCATION*
GPS unavailable — please call back to confirm location.`;
    }

    // Full WhatsApp message
    const message =
`🚨🚨 *RESCUENET EMERGENCY SOS* 🚨🚨
━━━━━━━━━━━━━━━━━━━━━━
${severityEmoji} *Severity : ${severity}*
🕐 *Time     : ${time}*
━━━━━━━━━━━━━━━━━━━━━━

${locationBlock}

━━━━━━━━━━━━━━━━━━━━━━
⚠ *THIS IS A REAL EMERGENCY*
Immediate help is needed NOW.

✅ *Steps:*
1. Call back IMMEDIATELY
2. If no answer → go to location
3. Emergency services: *112*

📡 Sent via RescueNet AI System
━━━━━━━━━━━━━━━━━━━━━━`;

    setProgress(100);
    setStatus("✅ SOS SENT — Help is on the way!", "#00ff95");

    // Clean phone number (remove spaces, dashes, +)
    const cleanContact = contact.replace(/[\s\-\+]/g, "");
    const url = `https://wa.me/${cleanContact}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

// =========================
// BUTTON LISTENERS
// =========================

// Main SOS button
sosBtn?.addEventListener("click", triggerSOS);

// Floating SOS — scroll to SOS section
floatingSOS?.addEventListener("click", () => {
    document.getElementById("sosSection")?.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
});