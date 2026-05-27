const clock = document.getElementById('clock');

function updateClock()
{
    const now = new Date();

    clock.innerHTML =
    now.toLocaleTimeString();
}

setInterval(updateClock,1000);

updateClock();

/* SOS BUTTON */

const sosButton =
document.getElementById('sosButton');

sosButton.addEventListener('click',activateSOS);

function activateSOS()
{
    sosButton.innerHTML = 'SENDING...';

    sosButton.style.boxShadow =
    '0 0 100px rgba(255,0,0,1)';

    showEmergencyPopup();

    triggerEmergencyAnimation();

    navigator.geolocation.getCurrentPosition(
    async(position)=>
    {
        const latitude =
        position.coords.latitude;

        const longitude =
        position.coords.longitude;

        const emergencyData =
        {
            type:'SOS Emergency',

            severity:'Critical',

            location:
            {
                latitude,
                longitude
            },

            timestamp:new Date().toISOString()
        };

        console.log(
        'Emergency Activated:',
        emergencyData
        );

        setTimeout(()=>
        {
            sosButton.innerHTML = 'SOS';
        },4000);
    });
}

/* EMERGENCY POPUP */

function showEmergencyPopup()
{
    const popup =
    document.createElement('div');

    popup.className =
    'emergency-popup';

    popup.innerHTML =
    `
    <div class="popup-content">

        <h2>
        🚨 Emergency Activated
        </h2>

        <p>
        Dispatching emergency services...
        </p>

    </div>
    `;

    document.body.appendChild(popup);

    setTimeout(()=>
    {
        popup.remove();
    },4000);
}

/* SCREEN FLASH */

function triggerEmergencyAnimation()
{
    const flash =
    document.createElement('div');

    flash.className =
    'screen-flash';

    document.body.appendChild(flash);

    setTimeout(()=>
    {
        flash.remove();
    },1000);
}

/* LIVE INCIDENT SIMULATION */

const incidentContainer =
document.querySelector('.incident-panel');

const incidents =
[
    {
        title:'Fire Emergency',
        location:'Central Chennai',
        level:'CRITICAL'
    },

    {
        title:'Road Accident',
        location:'OMR Junction',
        level:'HIGH'
    },

    {
        title:'Vehicle Breakdown',
        location:'ECR Highway',
        level:'MODERATE'
    }
];

setInterval(()=>
{
    const randomIncident =
    incidents[
    Math.floor(
    Math.random()*incidents.length
    )];

    const incident =
    document.createElement('div');

    incident.className =
    'incident';

    incident.innerHTML =
    `
    <div>

        <h4>
        ${randomIncident.title}
        </h4>

        <p>
        ${randomIncident.location}
        </p>

    </div>

    <span class="badge critical-badge">
    ${randomIncident.level}
    </span>
    `;

    incidentContainer.appendChild(incident);

    if(incidentContainer.children.length > 6)
    {
        incidentContainer.removeChild(
        incidentContainer.children[1]
        );
    }

},7000);

/* SYSTEM STARTUP EFFECT */

window.addEventListener('load',()=>
{
    const cards =
    document.querySelectorAll('.glass-card');

    cards.forEach((card,index)=>
    {
        card.style.opacity = 0;

        card.style.transform =
        'translateY(40px)';

        setTimeout(()=>
        {
            card.style.transition =
            '0.6s ease';

            card.style.opacity = 1;

            card.style.transform =
            'translateY(0px)';

        },index * 120);
    });
});

/* LIVE AI STATUS */

const statusMessages =
[
    'AI scanning city traffic...',
    'Monitoring emergency network...',
    'Responder system synchronized...',
    'Heatmap analytics updated...',
    'Emergency routes optimized...'
];

setInterval(()=>
{
    console.log(
    statusMessages[
    Math.floor(
    Math.random()*statusMessages.length
    )]
    );

},5000);