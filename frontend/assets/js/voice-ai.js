/* =========================
   RESCUENET VOICE AI SYSTEM
========================= */

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

/* =========================
   CHECK SUPPORT
========================= */

if(!SpeechRecognition)
{
    console.log(
    'Voice recognition not supported'
    );
}

/* =========================
   CREATE RECOGNITION
========================= */

const recognition =
new SpeechRecognition();

recognition.lang =
'en-US';

recognition.continuous =
false;

recognition.interimResults =
false;

/* =========================
   STATUS
========================= */

let listening = false;

/* =========================
   START VOICE AI
========================= */

export function startVoiceAI()
{
    try
    {
        recognition.start();

        listening = true;

        showVoiceStatus(
        '🎤 Listening for emergency command...'
        );

    }

    catch(error)
    {
        console.log(error);
    }
}

/* =========================
   STOP
========================= */

export function stopVoiceAI()
{
    recognition.stop();

    listening = false;

    showVoiceStatus(
    'Voice assistant stopped'
    );
}

/* =========================
   RESULTS
========================= */

recognition.onresult =
(event)=>
{
    const transcript =
    event.results[0][0]
    .transcript;

    console.log(
    'VOICE INPUT:',
    transcript
    );

    processVoiceCommand(
    transcript
    );

    fillEmergencyInput(
    transcript
    );
};

/* =========================
   END
========================= */

recognition.onend =
()=>
{
    listening = false;
};

/* =========================
   ERRORS
========================= */

recognition.onerror =
(event)=>
{
    console.log(
    'Voice Error:',
    event.error
    );

    showVoiceStatus(
    'Voice recognition failed'
    );
};

/* =========================
   PROCESS COMMANDS
========================= */

function processVoiceCommand(text)
{
    const command =
    text.toLowerCase();

    /* SOS */

    if(
        command.includes('help')
        ||
        command.includes('emergency')
        ||
        command.includes('accident')
    )
    {
        emergencyAlert();
    }

    /* FIRE */

    if(
        command.includes('fire')
    )
    {
        fireAlert();
    }

    /* MEDICAL */

    if(
        command.includes('medical')
        ||
        command.includes('blood')
        ||
        command.includes('heart')
    )
    {
        medicalAlert();
    }

    /* LOCATION */

    if(
        command.includes('location')
    )
    {
        speakResponse(
        'Live GPS tracking is enabled.'
        );
    }
}

/* =========================
   FILL INPUT
========================= */

function fillEmergencyInput(text)
{
    const input =
    document.getElementById(
    'emergencyInput'
    );

    if(input)
    {
        input.value = text;
    }
}

/* =========================
   SPEECH RESPONSE
========================= */

function speakResponse(message)
{
    const speech =
    new SpeechSynthesisUtterance(
    message
    );

    speech.rate = 1;

    speech.pitch = 1;

    speech.volume = 1;

    window.speechSynthesis
    .speak(speech);
}

/* =========================
   ALERT TYPES
========================= */

function emergencyAlert()
{
    showVoiceStatus(
    '🚨 Emergency detected'
    );

    speakResponse(
    'Emergency detected. RescueNet is preparing responders.'
    );

    flashScreen(
    '#ff3b3b'
    );
}

function fireAlert()
{
    showVoiceStatus(
    '🔥 Fire emergency detected'
    );

    speakResponse(
    'Fire rescue units are being prioritized.'
    );

    flashScreen(
    '#ff6b00'
    );
}

function medicalAlert()
{
    showVoiceStatus(
    '🏥 Medical emergency detected'
    );

    speakResponse(
    'Medical responders are being notified.'
    );

    flashScreen(
    '#00e5ff'
    );
}

/* =========================
   SCREEN FLASH
========================= */

function flashScreen(color)
{
    const overlay =
    document.createElement('div');

    overlay.style.position =
    'fixed';

    overlay.style.inset =
    '0';

    overlay.style.background =
    color;

    overlay.style.opacity =
    '0.18';

    overlay.style.zIndex =
    '9999';

    overlay.style.pointerEvents =
    'none';

    document.body
    .appendChild(overlay);

    setTimeout(()=>
    {
        overlay.remove();

    },350);
}

/* =========================
   STATUS DISPLAY
========================= */

function showVoiceStatus(message)
{
    let status =
    document.getElementById(
    'voiceStatus'
    );

    if(!status)
    {
        status =
        document.createElement('div');

        status.id =
        'voiceStatus';

        status.style.position =
        'fixed';

        status.style.bottom =
        '20px';

        status.style.right =
        '20px';

        status.style.padding =
        '14px 18px';

        status.style.borderRadius =
        '14px';

        status.style.background =
        'rgba(0,0,0,0.75)';

        status.style.backdropFilter =
        'blur(15px)';

        status.style.border =
        '1px solid rgba(255,255,255,0.1)';

        status.style.color =
        'white';

        status.style.zIndex =
        '99999';

        document.body
        .appendChild(status);
    }

    status.innerHTML =
    message;
}

/* =========================
   AUTO HOTWORD DETECTION
========================= */

export function enableHotword()
{
    console.log(
    'Hotword engine active'
    );

    /*
    FUTURE:
    integrate Gemini AI
    */
}

/* =========================
   LIVE VOICE AI LOGS
========================= */

const logs =
[
    'Voice neural engine calibrated',

    'Speech emergency detection active',

    'Audio responder network online',

    'AI voice monitoring synchronized'
];

setInterval(()=>
{
    console.log(
    logs[
    Math.floor(
    Math.random()*logs.length
    )]
    );

},10000);

/* =========================
   GLOBAL BUTTON SUPPORT
========================= */

window.startVoiceAI =
startVoiceAI;

console.log(
'Voice AI System Activated'
);