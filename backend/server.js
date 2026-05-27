/* =========================
   RESCUENET BACKEND SERVER
========================= */

require('dotenv').config();

const express =
require('express');

const cors =
require('cors');

/* =========================
   APP
========================= */

const app =
express();

const PORT =
process.env.PORT || 5000;

/* =========================
   MIDDLEWARE
========================= */

app.use(cors());

app.use(express.json());

/* =========================
   TWILIO DEMO / LIVE MODE
========================= */

let client = null;

if(process.env.USE_TWILIO === "true")
{
    const twilio =
    require('twilio');

    client =
    twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
    );

    console.log(
    "✅ Twilio Live Mode Enabled"
    );
}
else
{
    console.log(
    "🚨 Twilio Demo Mode Enabled"
    );
}

/* =========================
   MOCK INCIDENT DATABASE
========================= */

const incidents =
[
    {
        id:1,
        type:'Vehicle Collision',
        severity:'CRITICAL',
        location:'OMR Highway',
        responders:'Ambulance RN-A12'
    },

    {
        id:2,
        type:'Road Flooding',
        severity:'HIGH',
        location:'Velachery',
        responders:'Police RN-C7'
    }
];

/* =========================
   HOME
========================= */

app.get(
'/',

(req,res)=>
{
    res.status(200)
    .json(
    {
        success:true,

        project:
        'RescueNet',

        status:
        'Backend Active',

        mode:
        process.env.USE_TWILIO === "true"
        ? 'LIVE'
        : 'DEMO'
    });
});

/* =========================
   HEALTH CHECK
========================= */

app.get(
'/api/health',

(req,res)=>
{
    res.status(200)
    .json(
    {
        server:'ONLINE',

        ai:'ACTIVE',

        emergencyNetwork:'CONNECTED',

        timestamp:
        new Date()
        .toISOString()
    });
});

/* =========================
   SEND EMERGENCY SMS
========================= */

app.post(
'/api/send-sms',

async(req,res)=>
{
    try
    {
        const
        {
            contact,
            severity,
            latitude,
            longitude
        }
        =
        req.body;

        /* VALIDATION */

        if(!contact)
        {
            return res.status(400)
            .json(
            {
                success:false,

                error:
                'Emergency contact required'
            });
        }

        const emergencyTime =
        new Date()
        .toLocaleString();

        const mapLink =
        `https://maps.google.com/?q=${latitude},${longitude}`;

        const smsBody =
`
🚨 RESCUENET ALERT

Severity:
${severity}

Emergency Time:
${emergencyTime}

Location:
${mapLink}

Emergency responders dispatched.
`;

        /* =========================
           DEMO MODE
        ========================= */

        if(process.env.USE_TWILIO === "false")
        {
            console.log(
            "\n🚨 DEMO SOS ALERT\n"
            );

            console.log(
            "Contact:",
            contact
            );

            console.log(
            "Severity:",
            severity
            );

            console.log(
            "Location:",
            latitude,
            longitude
            );

            console.log(
            "Map:",
            mapLink
            );

            console.log(
            "\n✅ Demo Emergency Alert Simulated\n"
            );

            return res.status(200)
            .json(
            {
                success:true,

                mode:'DEMO',

                message:
                'Emergency alert simulated successfully',

                data:
                {
                    contact,
                    severity,
                    latitude,
                    longitude,
                    emergencyTime
                }
            });
        }

        /* =========================
           LIVE MODE
        ========================= */

        const contacts =
        Array.isArray(contact)
        ? contact
        : [contact];

        const results = [];

        for(const number of contacts)
        {
            const response =
            await client.messages.create(
            {
                body:smsBody,

                from:
                process.env.TWILIO_PHONE_NUMBER,

                to:number
            });

            results.push(
            {
                number,
                sid:response.sid
            });
        }

        res.status(200)
        .json(
        {
            success:true,

            mode:'LIVE',

            message:
            'Emergency SMS sent successfully',

            results
        });

    }

    catch(error)
    {
        console.error(
        '\n❌ SERVER ERROR:\n',
        error
        );

        res.status(500)
        .json(
        {
            success:false,

            error:error.message
        });
    }
});

/* =========================
   INCIDENT LOGS
========================= */

app.get(
'/api/incidents',

(req,res)=>
{
    res.status(200)
    .json(
    {
        success:true,

        total:
        incidents.length,

        incidents
    });
});

/* =========================
   ADD INCIDENT
========================= */

app.post(
'/api/incidents',

(req,res)=>
{
    try
    {
        const
        {
            type,
            severity,
            location
        }
        =
        req.body;

        const newIncident =
        {
            id:
            incidents.length + 1,

            type:
            type || 'Unknown Incident',

            severity:
            severity || 'MODERATE',

            location:
            location || 'Unknown Location',

            responders:
            'Dispatch Pending',

            createdAt:
            new Date()
            .toISOString()
        };

        incidents.unshift(
        newIncident
        );

        res.status(201)
        .json(
        {
            success:true,

            message:
            'Incident created successfully',

            incident:
            newIncident
        });
    }

    catch(error)
    {
        res.status(500)
        .json(
        {
            success:false,

            error:error.message
        });
    }
});

/* =========================
   AI STATUS
========================= */

app.get(
'/api/ai-status',

(req,res)=>
{
    const riskLevels =
    [
        'LOW',
        'MODERATE',
        'HIGH',
        'CRITICAL'
    ];

    const randomRisk =
    riskLevels[
    Math.floor(
    Math.random() *
    riskLevels.length
    )];

    res.status(200)
    .json(
    {
        success:true,

        ai:'ACTIVE',

        riskLevel:
        randomRisk,

        confidence:
        '98%',

        responders:
        '42 ONLINE',

        monitoring:
        'CITY WIDE',

        timestamp:
        new Date()
        .toISOString()
    });
});

/* =========================
   404 HANDLER
========================= */

app.use(
(req,res)=>
{
    res.status(404)
    .json(
    {
        success:false,

        error:
        'Route not found'
    });
});

/* =========================
   START SERVER
========================= */

app.listen(
PORT,

()=>
{
    console.log(
`
====================================

🚑 RESCUENET BACKEND ACTIVE

🌐 PORT:
${PORT}

🧠 AI STATUS:
ONLINE

📡 EMERGENCY NETWORK:
CONNECTED

📱 TWILIO MODE:
${process.env.USE_TWILIO === "true"
? "LIVE"
: "DEMO"}

====================================
`
    );
});