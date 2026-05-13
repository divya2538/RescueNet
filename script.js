function findHelp() {

    let contact = document.getElementById("contactNumber").value;

    if (contact === "") {
        alert("Please enter emergency contact number.");
        return;
    }

    contact = contact.trim().replace("+", "").replace(/\s/g, "");

    navigator.geolocation.getCurrentPosition(

        function (position) {

            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            let locationLink =
                "https://www.google.com/maps?q=" +
                latitude + "," + longitude;

            let navigationLink =
                "https://www.google.com/maps/dir/?api=1&destination=" +
                latitude + "," + longitude;

            let time = new Date().toLocaleString();

            let batteryText = "";

            if (navigator.getBattery) {
                navigator.getBattery().then(function (battery) {
                    batteryText = (battery.level * 100).toFixed(0) + "%";

                    sendMessage();
                });
            } else {
                sendMessage();
            }

            function sendMessage() {

                let emergencyMessage =
                    "🚨 EMERGENCY SOS ALERT 🚨\n\n" +
                    "A road accident has been detected.\n\n" +
                    "🚑 Ambulance requested immediately.\n\n" +
                    "📍 Live Location:\n" +
                    locationLink + "\n\n" +
                    "🧭 Navigate:\n" +
                    navigationLink + "\n\n" +
                    "⏰ Time: " + time + "\n" +
                    "🔋 Battery: " + (batteryText || "Not available") + "\n\n" +
                    "PLEASE REACH IMMEDIATELY.";

                let whatsappURL =
                    "https://wa.me/" +
                    contact +
                    "?text=" +
                    encodeURIComponent(emergencyMessage);

                window.location.href = whatsappURL;
            }

        },

        function () {
            alert("Unable to detect location. Please enable GPS.");
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}
