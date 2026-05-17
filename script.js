let sosTimer;

let currentLat = "";
let currentLon = "";

function addTimeline(message)
{
    let timeline =
    document.getElementById("timeline");

    if(timeline)
    {
        let li =
        document.createElement("li");

        li.innerText =
        new Date().toLocaleTimeString()
        + " - " + message;

        timeline.appendChild(li);
    }
}

function findHelp()
{
    let contact =
    document.getElementById(
        "contactNumber"
    ).value;

    if(contact === "")
    {
        alert(
        "Enter emergency contact"
        );

        return;
    }

    let countdown = 10;

    document.body.classList.add(
    "sos-active"
    );

    document.getElementById(
    "cancelBtn"
    ).style.display = "block";

    addTimeline(
    "SOS Activated"
    );

    sosTimer = setInterval(function()
    {
        countdown--;

        document.getElementById(
        "result"
        ).innerHTML =
        "SOS in "
        + countdown
        + " seconds";

        if(countdown <= 0)
        {
            clearInterval(sosTimer);

            startSOS(contact);
        }

    },1000);
}

function cancelSOS()
{
    clearInterval(sosTimer);

    document.getElementById(
    "result"
    ).innerHTML =
    "SOS Cancelled";

    document.body.classList.remove(
    "sos-active"
    );
}

function startSOS(contact)
{
    navigator.geolocation
    .getCurrentPosition(

    function(position)
    {
        let latitude =
        position.coords.latitude;

        let longitude =
        position.coords.longitude;

        let severity =
        document.getElementById(
        "severityLevel"
        ).value;

        addTimeline(
        "GPS Location Captured"
        );

        document.getElementById(
        "riskBar"
        ).style.width = "90%";

        let locationLink =
        `https://www.google.com/maps?q=${latitude},${longitude}`;

        let hospitalLink =
        `https://www.google.com/maps/search/hospitals/@${latitude},${longitude},15z`;

        let policeLink =
        `https://www.google.com/maps/search/police/@${latitude},${longitude},15z`;

        let mechanicLink =
        `https://www.google.com/maps/search/mechanic/@${latitude},${longitude},15z`;

        let fuelLink =
        `https://www.google.com/maps/search/fuel/@${latitude},${longitude},15z`;

        document.getElementById(
        "hospitalStatus"
        ).innerHTML =
        `<a href="${hospitalLink}" target="_blank">Open Hospitals</a>`;

        document.getElementById(
        "policeStatus"
        ).innerHTML =
        `<a href="${policeLink}" target="_blank">Open Police</a>`;

        document.getElementById(
        "mechanicStatus"
        ).innerHTML =
        `<a href="${mechanicLink}" target="_blank">Open Mechanics</a>`;

        document.getElementById(
        "fuelStatus"
        ).innerHTML =
        `<a href="${fuelLink}" target="_blank">Open Fuel Stations</a>`;

        let message =
        "🚨 RescueNet AI SOS 🚨\n\n"
        +
        "Severity: "
        + severity
        + "\n\n"
        +
        "📍 Location:\n"
        + locationLink;

        let whatsappURL =
        `https://wa.me/${contact}?text=${encodeURIComponent(message)}`;

        addTimeline(
        "Emergency Message Sent"
        );

        window.open(
        whatsappURL
        );

    },

    function()
    {
        alert(
        "Enable GPS access"
        );
    });
}

function checkEmergency()
{
    let input =
    document.getElementById(
    "emergencyInput"
    ).value.toLowerCase();

    let severity = "";
    let recommendation = "";
    let services = "";

    if(
        input.includes("blood")
        ||
        input.includes("unconscious")
    )
    {
        severity =
        "Critical";

        recommendation =
        "Immediate trauma care";

        services =
        "Ambulance, Police";

        document.getElementById(
        "riskBar"
        ).style.width = "95%";
    }

    else if(
        input.includes("fire")
    )
    {
        severity =
        "Fire Emergency";

        recommendation =
        "Evacuate area";

        services =
        "Fire Force";

        document.getElementById(
        "riskBar"
        ).style.width = "85%";
    }

    else
    {
        severity =
        "Moderate";

        recommendation =
        "Medical attention advised";

        services =
        "Hospital";

        document.getElementById(
        "riskBar"
        ).style.width = "60%";
    }

    document.getElementById(
    "severity"
    ).innerText =
    severity;

    document.getElementById(
    "recommendation"
    ).innerText =
    recommendation;

    document.getElementById(
    "services"
    ).innerText =
    services;
}

function startVoice()
{
    let recognition =
    new webkitSpeechRecognition();

    recognition.lang =
    "en-US";

    recognition.onresult =
    function(event)
    {
        document.getElementById(
        "emergencyInput"
        ).value =
        event.results[0][0].transcript;
    };

    recognition.start();
}

function getLocation()
{
    navigator.geolocation
    .getCurrentPosition(

    function(position)
    {
        currentLat =
        position.coords.latitude;

        currentLon =
        position.coords.longitude;

        document.getElementById(
        "locationText"
        ).innerText =
        `Location:
        ${currentLat},
        ${currentLon}`;
    });
}

function submitReport()
{
    let issue =
    document.getElementById(
    "issueType"
    ).value;

    alert(
    "Report Submitted:\n"
    + issue
    );
}

window.addEventListener(
"offline",
function()
{
    alert(
    "Offline Emergency Mode Enabled"
    );
});
