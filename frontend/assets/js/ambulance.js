/* =========================
   RESCUENET LIVE AMBULANCE SYSTEM
========================= */

/*
FEATURES:
- Animated ambulance movement
- Route simulation
- ETA updates
- Live responder status
- Route visualization
*/

/* =========================
   AMBULANCE ICON
========================= */

const ambulanceIcon =
L.icon(
{
    iconUrl:
    'https://cdn-icons-png.flaticon.com/512/2966/2966488.png',

    iconSize:[55,55]
});

/* =========================
   ROUTE POINTS
========================= */

const ambulanceRoute =
[
    [13.0627,80.2407],
    [13.0687,80.2487],
    [13.0737,80.2557],
    [13.0787,80.2617],
    [13.0827,80.2707]
];

/* =========================
   DESTINATION
========================= */

const emergencyDestination =
ambulanceRoute[
ambulanceRoute.length - 1
];

/* =========================
   ROUTE LINE
========================= */

const ambulancePath =
L.polyline(
ambulanceRoute,
{
    color:'#00e5ff',

    weight:5,

    opacity:0.8,

    dashArray:'12 12'
})
.addTo(map);

/* =========================
   DESTINATION MARKER
========================= */

const destinationMarker =
L.marker(
emergencyDestination
)
.addTo(map);

destinationMarker.bindPopup(
`
🚨 Emergency Destination
`
);

/* =========================
   AMBULANCE MARKER
========================= */

const ambulanceMarker =
L.marker(
ambulanceRoute[0],
{
    icon:ambulanceIcon
})
.addTo(map);

ambulanceMarker.bindPopup(
`
🚑 RescueNet Ambulance
`
);

/* =========================
   STATUS PANEL
========================= */

createDispatchPanel();

/* =========================
   LIVE MOVEMENT
========================= */

let currentPoint = 0;

let etaMinutes = 8;

function moveAmbulance()
{
    if(
        currentPoint >=
        ambulanceRoute.length - 1
    )
    {
        dispatchComplete();

        return;
    }

    currentPoint++;

    const nextPosition =
    ambulanceRoute[currentPoint];

    ambulanceMarker.setLatLng(
    nextPosition
    );

    map.panTo(nextPosition);

    updateETA();

    updateResponderFeed();

    animateRouteGlow();

    setTimeout(
    moveAmbulance,
    2500
    );
}

/* =========================
   START SIMULATION
========================= */

setTimeout(()=>
{
    moveAmbulance();

},3000);

/* =========================
   ETA
========================= */

function updateETA()
{
    etaMinutes--;

    if(etaMinutes < 1)
    {
        etaMinutes = 1;
    }

    const eta =
    document.getElementById(
    'etaTime'
    );

    if(eta)
    {
        eta.innerHTML =
        `${etaMinutes} min`;
    }
}

/* =========================
   ROUTE GLOW
========================= */

function animateRouteGlow()
{
    ambulancePath.setStyle(
    {
        opacity:
        Math.random()*0.5 + 0.5
    });
}

/* =========================
   DISPATCH COMPLETE
========================= */

function dispatchComplete()
{
    const status =
    document.getElementById(
    'dispatchStatus'
    );

    if(status)
    {
        status.innerHTML =
        `
        ARRIVED AT INCIDENT
        `;
    }

    showArrivalNotification();
}

/* =========================
   ARRIVAL NOTIFICATION
========================= */

function showArrivalNotification()
{
    const notification =
    document.createElement('div');

    notification.innerHTML =
    `
    🚑 Ambulance arrived at emergency zone
    `;

    notification.style.position =
    'fixed';

    notification.style.top =
    '20px';

    notification.style.left =
    '50%';

    notification.style.transform =
    'translateX(-50%)';

    notification.style.padding =
    '18px 24px';

    notification.style.background =
    '#00ff95';

    notification.style.color =
    '#071018';

    notification.style.fontWeight =
    '700';

    notification.style.borderRadius =
    '18px';

    notification.style.zIndex =
    '999999';

    notification.style.boxShadow =
    '0 0 35px rgba(0,255,149,0.4)';

    document.body
    .appendChild(notification);

    setTimeout(()=>
    {
        notification.remove();

    },5000);
}

/* =========================
   PANEL
========================= */

function createDispatchPanel()
{
    const panel =
    document.createElement('div');

    panel.id =
    'dispatchPanel';

    panel.innerHTML =
    `
    <div class="dispatch-header">
        🚑 LIVE DISPATCH
    </div>

    <div class="dispatch-row">
        <span>Status</span>
        <span id="dispatchStatus">
        RESPONDING
        </span>
    </div>

    <div class="dispatch-row">
        <span>ETA</span>
        <span id="etaTime">
        8 min
        </span>
    </div>

    <div class="dispatch-row">
        <span>Unit</span>
        <span>
        RN-A12
        </span>
    </div>

    <div class="dispatch-row">
        <span>Priority</span>
        <span>
        CRITICAL
        </span>
    </div>
    `;

    panel.style.position =
    'fixed';

    panel.style.top =
    '110px';

    panel.style.right =
    '20px';

    panel.style.width =
    '280px';

    panel.style.padding =
    '24px';

    panel.style.borderRadius =
    '24px';

    panel.style.background =
    'rgba(7,16,24,0.88)';

    panel.style.backdropFilter =
    'blur(18px)';

    panel.style.border =
    '1px solid rgba(255,255,255,0.08)';

    panel.style.color =
    'white';

    panel.style.zIndex =
    '99999';

    panel.style.boxShadow =
    '0 0 35px rgba(0,229,255,0.1)';

    document.body
    .appendChild(panel);

    styleDispatchRows();
}

/* =========================
   ROWS
========================= */

function styleDispatchRows()
{
    const rows =
    document.querySelectorAll(
    '.dispatch-row'
    );

    rows.forEach((row)=>
    {
        row.style.display =
        'flex';

        row.style.justifyContent =
        'space-between';

        row.style.marginTop =
        '18px';

        row.style.paddingBottom =
        '12px';

        row.style.borderBottom =
        '1px solid rgba(255,255,255,0.06)';
    });

    const header =
    document.querySelector(
    '.dispatch-header'
    );

    header.style.fontSize =
    '22px';

    header.style.fontWeight =
    '700';

    header.style.color =
    '#00e5ff';
}

/* =========================
   LIVE FEED
========================= */

function updateResponderFeed()
{
    const updates =
    [
        'Responder nearing destination',

        'Traffic route optimized',

        'Emergency lane activated',

        'Medical team prepared',

        'Incident severity updated'
    ];

    console.log(
    updates[
    Math.floor(
    Math.random()*updates.length
    )]
    );
}

/* =========================
   MULTI UNIT SUPPORT
========================= */

export function dispatchAdditionalUnit()
{
    console.log(
    'Backup responder dispatched'
    );
}

/* =========================
   STATUS
========================= */

console.log(
'Live Ambulance Dispatch System Activated'
);