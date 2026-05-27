/* =========================
   RESCUENET AI HEATMAP SYSTEM
========================= */

/*
FORMAT:
[ LATITUDE, LONGITUDE, INTENSITY ]
*/

const accidentHeatData =
[
    [13.0827,80.2707,0.9],
    [13.0727,80.2607,0.7],
    [13.0927,80.2807,0.8],
    [13.1027,80.2907,0.6],
    [13.0627,80.2407,0.95],
    [13.0527,80.2507,0.5],
    [13.1150,80.3000,0.75],
    [13.0880,80.2250,0.65],
    [13.1200,80.2450,0.88],
    [13.1350,80.2750,0.72]
];

/* =========================
   CREATE HEATMAP
========================= */

const heatLayer =
L.heatLayer(
accidentHeatData,
{
    radius:35,

    blur:28,

    maxZoom:17,

    minOpacity:0.4,

    gradient:
    {
        0.2:'#00e5ff',

        0.4:'#00ff95',

        0.6:'#ffae00',

        0.8:'#ff6b00',

        1.0:'#ff0000'
    }
});

heatLayer.addTo(map);

/* =========================
   DANGER ZONE MARKERS
========================= */

const dangerZones =
[
    {
        title:'High Accident Zone',
        coords:[13.0827,80.2707],
        level:'CRITICAL'
    },

    {
        title:'Traffic Congestion Area',
        coords:[13.1027,80.2907],
        level:'MODERATE'
    },

    {
        title:'Night Accident Cluster',
        coords:[13.0627,80.2407],
        level:'HIGH'
    }
];

dangerZones.forEach((zone)=>
{
    const marker =
    L.circle(
    zone.coords,
    {
        radius:220,

        color:'#ff3b3b',

        fillColor:'#ff3b3b',

        fillOpacity:0.12,

        weight:2
    })
    .addTo(map);

    marker.bindPopup(
    `
    🚨 <b>${zone.title}</b>
    <br>
    Severity:
    ${zone.level}
    `
    );
});

/* =========================
   AI RISK PREDICTION
========================= */

function generateRiskPrediction()
{
    const predictions =
    [
        'AI predicts elevated collision risk near OMR',

        'Heavy rainfall may increase accidents',

        'Traffic congestion detected near city center',

        'Nighttime accident probability rising',

        'Responder delay risk detected'
    ];

    return predictions[
    Math.floor(
    Math.random()*predictions.length
    )];
}

/* =========================
   LIVE RISK ALERTS
========================= */

setInterval(()=>
{
    console.log(
    'AI HEATMAP:',
    generateRiskPrediction()
    );

},10000);

/* =========================
   ANIMATED INCIDENT GLOW
========================= */

const animatedZones =
[
    [13.0827,80.2707],
    [13.0627,80.2407]
];

animatedZones.forEach((coords)=>
{
    const pulse =
    L.circleMarker(
    coords,
    {
        radius:18,

        color:'#ff0000',

        fillColor:'#ff0000',

        fillOpacity:0.7
    })
    .addTo(map);

    animateHeatPulse(pulse);
});

/* =========================
   PULSE ANIMATION
========================= */

function animateHeatPulse(marker)
{
    let expanding = true;

    setInterval(()=>
    {
        let radius =
        marker.getRadius();

        if(expanding)
        {
            radius += 1;

            if(radius >= 28)
            {
                expanding = false;
            }
        }

        else
        {
            radius -= 1;

            if(radius <= 16)
            {
                expanding = true;
            }
        }

        marker.setRadius(radius);

    },140);
}

/* =========================
   FUTURE FIREBASE SUPPORT
========================= */

export async function loadRealtimeHeatmap(data)
{
    /*
    FUTURE FIREBASE STRUCTURE

    data =
    [
        {
            lat:13.08,
            lng:80.27,
            intensity:0.8
        }
    ]
    */

    const formatted =
    data.map((item)=>
    [
        item.lat,
        item.lng,
        item.intensity
    ]);

    heatLayer.setLatLngs(formatted);
}

/* =========================
   AI DENSITY ANALYSIS
========================= */

export function analyzeDensity()
{
    const density =
    accidentHeatData.length;

    if(density > 8)
    {
        return 'HIGH RISK CITY TRAFFIC';
    }

    if(density > 5)
    {
        return 'MODERATE RISK';
    }

    return 'LOW RISK';
}

/* =========================
   HEATMAP STATUS
========================= */

console.log(
'AI Heatmap System Activated'
);

console.log(
'Current Risk Level:',
analyzeDensity()
);