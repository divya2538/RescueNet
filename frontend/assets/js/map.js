/* =========================
   RESCUENET LIVE MAP SYSTEM
========================= */

const map =
L.map('map',
{
    zoomControl:true
})
.setView([13.0827,80.2707],13);

/* =========================
   DARK MAP
========================= */

L.tileLayer(
'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
{
    attribution:
    '&copy; OpenStreetMap contributors'
})
.addTo(map);

/* =========================
   USER MARKER
========================= */

let userMarker;

let userCircle;

/* =========================
   CUSTOM ICONS
========================= */

const hospitalIcon =
L.icon(
{
    iconUrl:
    'https://cdn-icons-png.flaticon.com/512/1484/1484848.png',

    iconSize:[38,38]
});

const policeIcon =
L.icon(
{
    iconUrl:
    'https://cdn-icons-png.flaticon.com/512/2991/2991231.png',

    iconSize:[38,38]
});

const fuelIcon =
L.icon(
{
    iconUrl:
    'https://cdn-icons-png.flaticon.com/512/3062/3062634.png',

    iconSize:[38,38]
});

const mechanicIcon =
L.icon(
{
    iconUrl:
    'https://cdn-icons-png.flaticon.com/512/1995/1995574.png',

    iconSize:[38,38]
});

/* =========================
   LIVE LOCATION
========================= */

navigator.geolocation.getCurrentPosition(
(position)=>
{
    const lat =
    position.coords.latitude;

    const lng =
    position.coords.longitude;

    /* CENTER */

    map.setView([lat,lng],15);

    /* USER MARKER */

    userMarker =
    L.marker([lat,lng])
    .addTo(map);

    userMarker.bindPopup(
    `
    📍 You are here
    `
    );

    /* ACCURACY */

    userCircle =
    L.circle(
    [lat,lng],
    {
        radius:120,

        color:'#00e5ff',

        fillColor:'#00e5ff',

        fillOpacity:0.15
    })
    .addTo(map);

    /* LOAD SERVICES */

    addNearbyServices(lat,lng);

},
(error)=>
{
    console.log(
    'Location access denied'
    );

    /* DEFAULT */

    addNearbyServices(
    13.0827,
    80.2707
    );
}
);

/* =========================
   NEARBY SERVICES
========================= */

function addNearbyServices(lat,lng)
{
    const services =
    [
        {
            type:'Hospital',
            icon:hospitalIcon,
            coords:[lat+0.01,lng+0.01],
            color:'#ff3b3b'
        },

        {
            type:'Police Station',
            icon:policeIcon,
            coords:[lat-0.008,lng+0.008],
            color:'#00e5ff'
        },

        {
            type:'Fuel Station',
            icon:fuelIcon,
            coords:[lat+0.006,lng-0.01],
            color:'#00ff95'
        },

        {
            type:'Mechanic',
            icon:mechanicIcon,
            coords:[lat-0.012,lng-0.006],
            color:'#ffae00'
        }
    ];

    services.forEach((service)=>
    {
        const marker =
        L.marker(
        service.coords,
        {
            icon:service.icon
        })
        .addTo(map);

        marker.bindPopup(
        `
        <b>${service.type}</b>
        <br>
        Emergency service available
        `
        );

        /* CONNECTION LINE */

        L.polyline(
        [
            [lat,lng],
            service.coords
        ],
        {
            color:service.color,

            weight:3,

            opacity:0.7,

            dashArray:'8 8'
        })
        .addTo(map);
    });
}

/* =========================
   LIVE INCIDENT MARKERS
========================= */

const incidentLocations =
[
    {
        coords:[13.0827,80.2707],
        title:'Vehicle Collision'
    },

    {
        coords:[13.0927,80.2507],
        title:'Medical Emergency'
    },

    {
        coords:[13.0727,80.2807],
        title:'Fire Incident'
    }
];

incidentLocations.forEach((incident)=>
{
    const pulseMarker =
    L.circleMarker(
    incident.coords,
    {
        radius:14,

        color:'#ff3b3b',

        fillColor:'#ff3b3b',

        fillOpacity:0.7
    })
    .addTo(map);

    pulseMarker.bindPopup(
    `
    🚨 ${incident.title}
    <br>
    Live emergency detected
    `
    );

    animatePulse(pulseMarker);
});

/* =========================
   PULSE EFFECT
========================= */

function animatePulse(marker)
{
    let growing = true;

    setInterval(()=>
    {
        let radius =
        marker.getRadius();

        if(growing)
        {
            radius += 1;

            if(radius >= 22)
            {
                growing = false;
            }
        }

        else
        {
            radius -= 1;

            if(radius <= 12)
            {
                growing = true;
            }
        }

        marker.setRadius(radius);

    },120);
}

/* =========================
   LOCATE BUTTON
========================= */

document
.getElementById(
'locateButton'
)
.addEventListener('click',()=>
{
    navigator.geolocation.getCurrentPosition(
    (position)=>
    {
        const lat =
        position.coords.latitude;

        const lng =
        position.coords.longitude;

        map.flyTo([lat,lng],16,
        {
            duration:2
        });

    });
});

/* =========================
   LIVE TRAFFIC SIMULATION
========================= */

const trafficLines =
[
    [
        [13.08,80.26],
        [13.09,80.27]
    ],

    [
        [13.07,80.25],
        [13.10,80.29]
    ]
];

trafficLines.forEach((line)=>
{
    L.polyline(
    line,
    {
        color:'#00e5ff',

        weight:2,

        opacity:0.35
    })
    .addTo(map);
});

/* =========================
   MAP STATUS LOGS
========================= */

const logs =
[
    'Emergency map synchronized',

    'GPS signal stabilized',

    'Responder tracking active',

    'Nearby services updated',

    'AI traffic monitoring enabled'
];

setInterval(()=>
{
    console.log(
    logs[
    Math.floor(
    Math.random()*logs.length
    )]
    );

},8000);