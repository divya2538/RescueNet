/* =========================
   RESCUENET AUTO ACCIDENT DETECTION
========================= */

/*
USES:
- DeviceMotion API
- Sudden acceleration detection
- Crash prediction logic
- Auto SOS countdown
*/

/* =========================
   SETTINGS
========================= */

const IMPACT_THRESHOLD = 32;

const ROTATION_THRESHOLD = 25;

const AUTO_SOS_TIME = 10;

/* =========================
   STATUS
========================= */

let accidentDetected = false;

let countdownActive = false;

let countdown = AUTO_SOS_TIME;

let countdownInterval;

/* =========================
   ENABLE MOTION DETECTION
========================= */

if(window.DeviceMotionEvent)
{
    window.addEventListener(
    'devicemotion',
    detectAccident
    );

    console.log(
    'Motion Detection Enabled'
    );
}

else
{
    console.log(
    'DeviceMotion API not supported'
    );
}

/* =========================
   DETECT ACCIDENT
========================= */

function detectAccident(event)
{
    if(accidentDetected)
    {
        return;
    }

    const acceleration =
    event.accelerationIncludingGravity;

    if(!acceleration)
    {
        return;
    }

    const x =
    Math.abs(acceleration.x || 0);

    const y =
    Math.abs(acceleration.y || 0);

    const z =
    Math.abs(acceleration.z || 0);

    const totalImpact =
    x + y + z;

    /* ROTATION */

    const rotation =
    event.rotationRate;

    let rotationImpact = 0;

    if(rotation)
    {
        rotationImpact =
        Math.abs(rotation.alpha || 0)
        +
        Math.abs(rotation.beta || 0)
        +
        Math.abs(rotation.gamma || 0);
    }

    /* CRASH LOGIC */

    if(
        totalImpact > IMPACT_THRESHOLD
        ||
        rotationImpact > ROTATION_THRESHOLD
    )
    {
        accidentDetected = true;

        triggerEmergencyDetection(
        totalImpact,
        rotationImpact
        );
    }
}

/* =========================
   TRIGGER EMERGENCY
========================= */

function triggerEmergencyDetection(
impact,
rotation
)
{
    console.log(
    'Possible Accident Detected'
    );

    showEmergencyPopup(
    impact,
    rotation
    );

    playAlertSound();

    flashEmergencyScreen();

    startSOSCountdown();
}

/* =========================
   EMERGENCY POPUP
========================= */

function showEmergencyPopup(
impact,
rotation
)
{
    const popup =
    document.createElement('div');

    popup.id =
    'accidentPopup';

    popup.innerHTML =
    `
    <div class="popup-content">

        <h1>
        🚨 POSSIBLE ACCIDENT DETECTED
        </h1>

        <p>
        Impact Level:
        ${impact.toFixed(1)}
        </p>

        <p>
        Rotation Level:
        ${rotation.toFixed(1)}
        </p>

        <div id="countdownText">
        Auto SOS in
        ${countdown}
        seconds
        </div>

        <button id="cancelSOS">
        CANCEL ALERT
        </button>

    </div>
    `;

    popup.style.position =
    'fixed';

    popup.style.inset =
    '0';

    popup.style.background =
    'rgba(0,0,0,0.88)';

    popup.style.display =
    'flex';

    popup.style.justifyContent =
    'center';

    popup.style.alignItems =
    'center';

    popup.style.zIndex =
    '999999';

    document.body
    .appendChild(popup);

    /* CONTENT */

    const content =
    popup.querySelector(
    '.popup-content'
    );

    content.style.background =
    '#071018';

    content.style.padding =
    '40px';

    content.style.borderRadius =
    '24px';

    content.style.border =
    '2px solid #ff3b3b';

    content.style.textAlign =
    'center';

    content.style.color =
    'white';

    content.style.boxShadow =
    '0 0 50px rgba(255,59,59,0.5)';

    /* BUTTON */

    const cancelBtn =
    document.getElementById(
    'cancelSOS'
    );

    cancelBtn.style.marginTop =
    '20px';

    cancelBtn.style.padding =
    '14px 22px';

    cancelBtn.style.border =
    'none';

    cancelBtn.style.borderRadius =
    '14px';

    cancelBtn.style.background =
    '#00e5ff';

    cancelBtn.style.fontWeight =
    '700';

    cancelBtn.style.cursor =
    'pointer';

    cancelBtn.addEventListener(
    'click',
    cancelEmergency
    );
}

/* =========================
   SOS COUNTDOWN
========================= */

function startSOSCountdown()
{
    if(countdownActive)
    {
        return;
    }

    countdownActive = true;

    countdownInterval =
    setInterval(()=>
    {
        countdown--;

        const countdownText =
        document.getElementById(
        'countdownText'
        );

        if(countdownText)
        {
            countdownText.innerHTML =
            `
            Auto SOS in
            ${countdown}
            seconds
            `;
        }

        if(countdown <= 0)
        {
            clearInterval(
            countdownInterval
            );

            activateSOS();
        }

    },1000);
}

/* =========================
   CANCEL
========================= */

function cancelEmergency()
{
    clearInterval(
    countdownInterval
    );

    countdownActive = false;

    accidentDetected = false;

    countdown = AUTO_SOS_TIME;

    const popup =
    document.getElementById(
    'accidentPopup'
    );

    if(popup)
    {
        popup.remove();
    }

    console.log(
    'Emergency cancelled'
    );
}

/* =========================
   ACTIVATE SOS
========================= */

function activateSOS()
{
    console.log(
    'AUTO SOS ACTIVATED'
    );

    const popup =
    document.getElementById(
    'accidentPopup'
    );

    if(popup)
    {
        popup.remove();
    }

    showDispatchMessage();

    triggerSOSButton();
}

/* =========================
   SOS BUTTON INTEGRATION
========================= */

function triggerSOSButton()
{
    const sosButton =
    document.getElementById(
    'sosButton'
    );

    if(sosButton)
    {
        sosButton.click();
    }
}

/* =========================
   DISPATCH MESSAGE
========================= */

function showDispatchMessage()
{
    const message =
    document.createElement('div');

    message.innerHTML =
    `
    🚑 Emergency responders dispatched
    `;

    message.style.position =
    'fixed';

    message.style.top =
    '20px';

    message.style.right =
    '20px';

    message.style.padding =
    '18px 24px';

    message.style.borderRadius =
    '16px';

    message.style.background =
    'rgba(255,59,59,0.95)';

    message.style.color =
    'white';

    message.style.fontWeight =
    '700';

    message.style.zIndex =
    '999999';

    document.body
    .appendChild(message);

    setTimeout(()=>
    {
        message.remove();

    },5000);
}

/* =========================
   FLASH SCREEN
========================= */

function flashEmergencyScreen()
{
    const flash =
    document.createElement('div');

    flash.style.position =
    'fixed';

    flash.style.inset =
    '0';

    flash.style.background =
    '#ff3b3b';

    flash.style.opacity =
    '0.2';

    flash.style.zIndex =
    '999998';

    flash.style.pointerEvents =
    'none';

    document.body
    .appendChild(flash);

    setTimeout(()=>
    {
        flash.remove();

    },400);
}

/* =========================
   ALERT SOUND
========================= */

function playAlertSound()
{
    const audio =
    new Audio(
    'https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg'
    );

    audio.play();
}

/* =========================
   LIVE SENSOR LOGS
========================= */

setInterval(()=>
{
    console.log(
    'Motion sensors active'
    );

},12000);

/* =========================
   STATUS
========================= */

console.log(
'Auto Accident Detection System Active'
);