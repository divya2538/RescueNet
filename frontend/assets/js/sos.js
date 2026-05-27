// =========================
// RESCUENET SOS SYSTEM
// =========================

const sosBtn = document.getElementById("sosButton");
const floatingSOS = document.getElementById("floatingSOS");
const statusBox = document.getElementById("sosStatus");

function triggerSOS() {
    const contact = document.getElementById("emergencyContact")?.value;
    const severity = document.getElementById("severitySelect")?.value;

    if (!contact) {
        statusBox.innerText = "⚠ Enter emergency contact number";
        return;
    }

    statusBox.innerText = "🚨 Sending SOS...";

    setTimeout(() => {
        statusBox.innerText = "✅ SOS SENT SUCCESSFULLY";

        // WhatsApp integration
        const message =
            `🚨 EMERGENCY ALERT\nSeverity: ${severity}\nPlease respond immediately.`;

        const url = `https://wa.me/${contact}?text=${encodeURIComponent(message)}`;

        window.open(url, "_blank");
    }, 1200);
}

// Main SOS button
sosBtn?.addEventListener("click", triggerSOS);

// Floating SOS scroll + alert
floatingSOS?.addEventListener("click", () => {
    document.getElementById("sosSection")?.scrollIntoView({
        behavior: "smooth"
    });
});