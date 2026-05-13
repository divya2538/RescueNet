let sosTimer;
let watchId;

function findHelp() {

    let contact = document.getElementById("contactNumber").value;

    if (contact === "") {
        alert("Please enter emergency contact number.");
        return;
    }

    contact = contact.trim().replace("+", "").replace(/\s/g, "");

    let countdown = 10;
    document.getElementById("result").innerHTML =
        "SOS will be sent in " + countdown + " seconds...";

    let cancelBtn = document.getElementById("cancelBtn");
    if (cancelBtn) cancelBtn.style.display = "block";

    sosTimer = setInterval(() => {
        countdown--;

        document.getElementById("result").innerHTML =
            "SOS will be sent in " + countdown + " seconds...";

        if (countdown <= 0) {
            clearInterval(sosTimer);
            startSOS(contact);
        }
    }, 1000);
}

function cancelSOS() {
    clearInterval(sosTimer);
    document.getElementById("result").innerHTML = "SOS Cancelled";
}

function startSOS(contact) {

    navigator.geolocation.getCurrentPosition(

        function (position) {

            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            let locationLink =
                "https://www.google.com/maps?q=" +
                latitude + "," + longitude;

            let trackerLink =
                "https://www.google.com/maps?q=" +
                latitude + "," + longitude + "&z=18";

            let hospitalLink =
                "https://www.google.com/maps/search/hospitals/@" +
                latitude + "," + longitude + ",15z";

            let navigationLink =
                "https://www.google.com/maps/dir/?api=1&destination=" +
                latitude + "," + longitude;

            let time = new Date().toLocaleString();

            let emergencyMessage =
                "🚨 EMERGENCY SOS ALERT 🚨\n\n" +
                "A road accident has been detected.\n\n" +
                "🚑 Ambulance requested immediately.\n\n" +
                "📍 Live Location:\n" +
                locationLink + "\n\n" +
                "🧭 Navigation:\n" +
                navigationLink + "\n\n" +
                "🏥 Nearby Hospitals:\n" +
                hospitalLink + "\n\n" +
                "📡 Live Tracker:\n" +
                trackerLink + "\n\n" +
                "⏰ Time: " + time + "\n\n" +
                "PLEASE REACH IMMEDIATELY.";

            let whatsappURL =
                "https://wa.me/" +
                contact +
                "?text=" +
                encodeURIComponent(emergencyMessage);

            document.getElementById("result").innerHTML =
                "SOS SENT SUCCESSFULLY";

            window.location.href = whatsappURL;

        },

        function () {
            alert("Unable to detect location. Enable GPS.");
        },

        {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0
        }
    );
}
