/* =========================
   LIVE CLOCK
========================= */
setInterval(() => {
    const c = document.getElementById("liveClock");
    if (c) c.innerText = new Date().toLocaleTimeString();
}, 1000);

/* =========================
   SOS SCROLL
========================= */
function goSOS() {
    const el = document.getElementById("sosSection");
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth" });
}

document.getElementById("quickSOSButton")?.addEventListener("click", goSOS);
document.getElementById("floatingSOS")?.addEventListener("click", goSOS);

/* =========================
   🚨 WHATSAPP SOS
========================= */

const statusBox    = document.getElementById("sosStatus");
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

function sendWhatsApp(phone, severity, lat, lng, accuracy) {

    const time = new Date().toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short"
    });

    const severityEmoji = {
        LOW:      "🟡",
        MODERATE: "🟠",
        CRITICAL: "🔴"
    }[severity] || "🔴";

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

    const cleanPhone = phone.replace(/[\s\-\+]/g, "");
    const url = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
}

function triggerSOS() {
    const phone    = document.getElementById("emergencyContact")?.value.trim();
    const severity = document.getElementById("severitySelect")?.value || "CRITICAL";

    if (!phone) {
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

                sendWhatsApp(phone, severity, lat, lng, acc);
            },
            () => {
                setStatus("⚠ Location unavailable. Sending SOS without GPS...", "#ffae00");
                setProgress(60);
                sendWhatsApp(phone, severity, null, null, null);
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
        sendWhatsApp(phone, severity, null, null, null);
    }
}

document.getElementById("sosButton")?.addEventListener("click", triggerSOS);

/* =========================
   LIVE EMERGENCY FEED
========================= */
const feedEvents = [
    { msg: '🚨 Vehicle collision — Anna Salai',     cls: ''         },
    { msg: '🏥 Medical emergency — T. Nagar',       cls: ''         },
    { msg: '🔥 Fire incident — Adyar',              cls: ''         },
    { msg: '⚠️ Road blockage — Velachery',          cls: 'moderate' },
    { msg: '🛢️ Fuel leak — Guindy',                 cls: 'moderate' },
    { msg: '✅ Incident resolved — Mylapore',       cls: 'low'      },
    { msg: '🚑 Ambulance dispatched — Tambaram',    cls: ''         },
    { msg: '🌊 Flood alert — ECR Junction',         cls: 'moderate' },
    { msg: '🚒 Fire unit en route — Guindy',        cls: ''         },
    { msg: '🟢 Zone cleared — Adyar',               cls: 'low'      }
];

const liveFeed = document.getElementById("liveFeed");

if (liveFeed) {
    feedEvents.slice(0, 4).forEach((e, i) => {
        setTimeout(() => {
            const div = document.createElement("div");
            div.className = `feed-item ${e.cls}`;
            div.textContent = e.msg;
            liveFeed.appendChild(div);
        }, i * 400);
    });

    let feedIndex = 4;
    setInterval(() => {
        const e   = feedEvents[feedIndex % feedEvents.length];
        const div = document.createElement("div");
        div.className = `feed-item ${e.cls}`;
        div.textContent = e.msg;
        liveFeed.prepend(div);
        if (liveFeed.children.length > 8) liveFeed.removeChild(liveFeed.lastElementChild);
        feedIndex++;
    }, 4000);
}