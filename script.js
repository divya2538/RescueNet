function findHelp() {

    let contact =
        document.getElementById("contactNumber").value;

    if (contact === "") {

        alert(
            "Please enter emergency contact number."
        );

        return;
    }

    navigator.geolocation.getCurrentPosition(

        function(position) {

            let latitude = position.coords.latitude;
            let longitude = position.coords.longitude;

            let mapLink =
                "https://www.google.com/maps/search/hospitals+near+me/@" +
                latitude + "," +
                longitude + ",15z";

            let emergencyMessage =

                "🚨 EMERGENCY ALERT 🚨\n\n" +

                "A road accident has been detected.\n\n" +

                "🚑 Ambulance has been alerted.\n\n" +

                "📍 Live Location:\n" +

                mapLink + "\n\n" +

                "Please reach immediately.";

            let whatsappURL =

                `https://wa.me/${contact}?text=${encodeURIComponent(emergencyMessage)}`;

            alert(

                "🚑 Ambulance Alerted Successfully!\n\n" +

                "Emergency contact is being notified."

            );

            window.open(whatsappURL);

            window.open(mapLink);

        },

        function() {

            alert(
                "Unable to detect location."
            );

        }

    );

}

function submitReport() {

    alert("Report Submitted Successfully!");

}

function checkEmergency() {

    let type =
        document.getElementById("emergencyType").value;

    let message = "";

    if (type === "Minor Accident") {

        message =
            "Priority: Medium - Contact nearby hospital.";

    }

    else if (type === "Serious Accident") {

        message =
            "Priority: HIGH - Call ambulance immediately.";

    }

    else if (type === "Fire Accident") {

        message =
            "Priority: CRITICAL - Contact fire service now.";

    }

    else {

        message =
            "Priority: Low - Contact roadside assistance.";

    }

    document.getElementById("result").innerHTML =
        message;
}