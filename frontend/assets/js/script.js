setInterval(() => {
    const c = document.getElementById("liveClock");
    if (c) c.innerText = new Date().toLocaleTimeString();
}, 1000);

/* SOS SCROLL */
function goSOS() {
    const el = document.getElementById("sosSection");
    if (!el) return;

    el.scrollIntoView({ behavior: "smooth" });
}

document.getElementById("quickSOSButton")?.addEventListener("click", goSOS);
document.getElementById("floatingSOS")?.addEventListener("click", goSOS);

/* =========================
   🚨 WHATSAPP SOS (HACKATHON FEATURE)
========================= */

document.getElementById("sosButton")?.addEventListener("click", () => {

    const phone = document.getElementById("emergencyContact")?.value || "91XXXXXXXXXX";
    const severity = document.getElementById("severitySelect")?.value || "LOW";

    const message =
`🚨 RESCUENET SOS ALERT 🚨
Severity: ${severity}
Location: Chennai (auto-detected)
Need immediate help!`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
});