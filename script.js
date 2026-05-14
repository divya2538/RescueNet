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

    clearInterval(sosTimer);

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

    document.getElementById("result").innerHTML =
        "SOS Cancelled";

    let cancelBtn = document.getElementById("cancelBtn");
    if (cancelBtn) cancelBtn.style.display = "none";
}

function startSOS(contact) {

    document.getElementById("result").innerHTML =
        "Fetching location...";

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
                "🚑 Ambulance requested immediately.\n\n" +
                "📍 Location:\n" +
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

            setTimeout(() => {
                window.location.href = whatsappURL;
            }, 300);

        },

        function () {
            document.getElementById("result").innerHTML =
                "Unable to detect location.";
        },

        {
            enableHighAccuracy: true,
            timeout: 15000,
            maximumAge: 0
        }
    );
}

function checkEmergency() {

    let type = document.getElementById("emergencyType").value;

    let message = "";

    if (type === "Minor Accident") {
        message = "🟡 Medium Priority: Contact nearest hospital and monitor condition.";
    }

    else if (type === "Serious Accident") {
        message = "🔴 HIGH Priority: Call ambulance (108) immediately and share live location.";
    }

    else if (type === "Fire Accident") {
        message = "🔥 CRITICAL: Call fire service (101) and evacuate area immediately.";
    }

    else if (type === "Vehicle Breakdown") {
        message = "🟢 Low Priority: Contact roadside assistance or mechanic help.";
    }

    document.getElementById("aiResult").innerText = message;
}
