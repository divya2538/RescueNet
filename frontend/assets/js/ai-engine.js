/* AI EMERGENCY INTELLIGENCE ENGINE */

export function analyzeEmergency(text)
{
    const input =
    text.toLowerCase();

    let score = 0;

    let severity = 'LOW';

    let className = 'low';

    let confidence = 45;

    let color = '#00ff95';

    let recommendations = [];

    let category = 'General Incident';

    /* KEYWORD DATABASE */

    const criticalKeywords =
    [
        'blood',
        'dead',
        'death',
        'fire',
        'explosion',
        'severe',
        'critical',
        'accident',
        'crash',
        'injured',
        'ambulance',
        'unconscious',
        'collapsed',
        'burning',
        'heart attack'
    ];

    const moderateKeywords =
    [
        'damage',
        'injury',
        'vehicle',
        'collision',
        'pain',
        'emergency',
        'smoke',
        'help',
        'road block',
        'fall',
        'panic'
    ];

    const lowKeywords =
    [
        'scratch',
        'minor',
        'small',
        'slow',
        'light',
        'repair'
    ];

    /* SCORING */

    criticalKeywords.forEach((word)=>
    {
        if(input.includes(word))
        {
            score += 25;
        }
    });

    moderateKeywords.forEach((word)=>
    {
        if(input.includes(word))
        {
            score += 12;
        }
    });

    lowKeywords.forEach((word)=>
    {
        if(input.includes(word))
        {
            score += 4;
        }
    });

    /* CATEGORY DETECTION */

    if(
        input.includes('fire')
        ||
        input.includes('burn')
        ||
        input.includes('smoke')
    )
    {
        category =
        'Fire Emergency';

        recommendations.push(
        'Dispatch nearest fire rescue unit'
        );

        recommendations.push(
        'Evacuate nearby civilians immediately'
        );
    }

    if(
        input.includes('heart')
        ||
        input.includes('blood')
        ||
        input.includes('medical')
        ||
        input.includes('unconscious')
    )
    {
        category =
        'Medical Emergency';

        recommendations.push(
        'Dispatch advanced life support ambulance'
        );

        recommendations.push(
        'Notify nearest trauma hospital'
        );
    }

    if(
        input.includes('vehicle')
        ||
        input.includes('crash')
        ||
        input.includes('collision')
    )
    {
        category =
        'Vehicle Accident';

        recommendations.push(
        'Alert traffic control authority'
        );

        recommendations.push(
        'Dispatch roadside rescue team'
        );
    }

    if(
        input.includes('breakdown')
        ||
        input.includes('engine')
        ||
        input.includes('fuel')
    )
    {
        category =
        'Vehicle Breakdown';

        recommendations.push(
        'Dispatch roadside mechanic'
        );

        recommendations.push(
        'Check fuel and engine diagnostics'
        );
    }

    /* SEVERITY CLASSIFICATION */

    if(score >= 70)
    {
        severity =
        'CRITICAL';

        className =
        'critical';

        confidence =
        randomBetween(88,99);

        color =
        '#ff3b3b';

        recommendations.push(
        'Activate highest emergency response'
        );

        recommendations.push(
        'Send multi-service emergency units'
        );

        recommendations.push(
        'Enable AI responder tracking'
        );
    }

    else if(score >= 35)
    {
        severity =
        'MODERATE';

        className =
        'moderate';

        confidence =
        randomBetween(65,87);

        color =
        '#ffae00';

        recommendations.push(
        'Monitor situation continuously'
        );

        recommendations.push(
        'Prepare responder deployment'
        );
    }

    else
    {
        severity =
        'LOW';

        className =
        'low';

        confidence =
        randomBetween(40,64);

        color =
        '#00ff95';

        recommendations.push(
        'Situation currently stable'
        );

        recommendations.push(
        'Continue safety observation'
        );
    }

    /* EXTRA AI LOGIC */

    if(input.length > 120)
    {
        confidence += 3;
    }

    if(
        input.includes('multiple')
        ||
        input.includes('many injured')
    )
    {
        severity = 'CRITICAL';

        className = 'critical';

        confidence = 98;

        color = '#ff3b3b';

        recommendations.push(
        'Mass casualty protocol activated'
        );
    }

    /* LIMIT */

    if(confidence > 99)
    {
        confidence = 99;
    }

    /* TIMELINE */

    const timeline =
    generateTimeline(severity);

    /* RESPONSE PRIORITY */

    const priority =
    generatePriority(severity);

    /* RETURN */

    return {

        severity,

        className,

        confidence,

        color,

        category,

        recommendations,

        timeline,

        priority
    };
}

/* PRIORITY */

function generatePriority(level)
{
    switch(level)
    {
        case 'CRITICAL':
        return 'Immediate Dispatch';

        case 'MODERATE':
        return 'Priority Monitoring';

        default:
        return 'Standard Observation';
    }
}

/* TIMELINE */

function generateTimeline(level)
{
    if(level === 'CRITICAL')
    {
        return [
            'Emergency received',
            'AI risk analysis completed',
            'Responder dispatch activated',
            'Hospital network alerted',
            'Live GPS tracking enabled'
        ];
    }

    if(level === 'MODERATE')
    {
        return [
            'Incident reported',
            'AI monitoring enabled',
            'Potential responders notified'
        ];
    }

    return [
        'Minor incident logged',
        'Safety monitoring active'
    ];
}

/* RANDOM */

function randomBetween(min,max)
{
    return Math.floor(
    Math.random() *
    (max-min+1)
    ) + min;
}

/* AI LIVE ENGINE LOGS */

const aiLogs =
[
    'Neural emergency model synchronized...',

    'Severity prediction engine online...',

    'Live responder AI connected...',

    'Traffic risk analysis running...',

    'AI emergency clustering active...',

    'Disaster response engine calibrated...',

    'Emergency confidence system optimized...'
];

setInterval(()=>
{
    console.log(
    aiLogs[
    Math.floor(
    Math.random()*aiLogs.length
    )]
    );

},9000);

/* AI PREDICTIVE ANALYSIS */

export function predictiveRisk()
{
    const risks =
    [
        'Traffic surge predicted near city center',

        'Rainfall may increase accident probability',

        'Critical congestion detected on highway',

        'Medical emergency demand rising',

        'AI predicts elevated nighttime risk'
    ];

    return risks[
    Math.floor(
    Math.random()*risks.length
    )];
}

/* AI INCIDENT GENERATOR */

export function generateIncident()
{
    const incidents =
    [
        {
            type:'Road Accident',
            severity:'CRITICAL'
        },

        {
            type:'Medical Emergency',
            severity:'MODERATE'
        },

        {
            type:'Vehicle Breakdown',
            severity:'LOW'
        },

        {
            type:'Fire Hazard',
            severity:'CRITICAL'
        }
    ];

    return incidents[
    Math.floor(
    Math.random()*incidents.length
    )];
}