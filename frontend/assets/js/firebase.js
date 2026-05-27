/* =========================
   RESCUENET FIREBASE SYSTEM
========================= */

import
{
    initializeApp
}
from
'https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js';

import
{
    getFirestore,
    collection,
    addDoc,
    getDocs,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy
}
from
'https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js';

/* =========================
   FIREBASE CONFIG
========================= */

/*
REPLACE WITH YOUR FIREBASE CONFIG
*/

const firebaseConfig =
{
    apiKey:
    "YOUR_API_KEY",

    authDomain:
    "YOUR_AUTH_DOMAIN",

    projectId:
    "YOUR_PROJECT_ID",

    storageBucket:
    "YOUR_STORAGE_BUCKET",

    messagingSenderId:
    "YOUR_MESSAGING_SENDER_ID",

    appId:
    "YOUR_APP_ID"
};

/* =========================
   INITIALIZE
========================= */

const app =
initializeApp(
firebaseConfig
);

const db =
getFirestore(app);

/* =========================
   COLLECTIONS
========================= */

const reportsCollection =
collection(
db,
'reports'
);

const sosCollection =
collection(
db,
'sos_history'
);

/* =========================
   SAVE HAZARD REPORT
========================= */

export async function saveHazardReport(
report
)
{
    try
    {
        const docRef =
        await addDoc(
        reportsCollection,
        {
            title:
            report.title,

            description:
            report.description,

            severity:
            report.severity,

            latitude:
            report.latitude,

            longitude:
            report.longitude,

            createdAt:
            serverTimestamp(),

            status:
            'ACTIVE'
        });

        console.log(
        'Hazard Report Saved:',
        docRef.id
        );

        showFirebaseToast(
        'Hazard report uploaded'
        );

    }

    catch(error)
    {
        console.error(
        'Error saving report:',
        error
        );

        showFirebaseToast(
        'Failed to upload report'
        );
    }
}

/* =========================
   SAVE SOS
========================= */

export async function saveSOSHistory(
data
)
{
    try
    {
        await addDoc(
        sosCollection,
        {
            contact:
            data.contact,

            severity:
            data.severity,

            latitude:
            data.latitude,

            longitude:
            data.longitude,

            emergencyType:
            data.type,

            createdAt:
            serverTimestamp(),

            status:
            'DISPATCHED'
        });

        console.log(
        'SOS Saved'
        );

    }

    catch(error)
    {
        console.error(
        error
        );
    }
}

/* =========================
   FETCH REPORTS
========================= */

export async function fetchReports()
{
    try
    {
        const snapshot =
        await getDocs(
        reportsCollection
        );

        const reports = [];

        snapshot.forEach((doc)=>
        {
            reports.push(
            {
                id:doc.id,
                ...doc.data()
            });
        });

        console.log(
        'Fetched Reports:',
        reports
        );

        return reports;
    }

    catch(error)
    {
        console.error(
        error
        );
    }
}

/* =========================
   REALTIME REPORTS
========================= */

export function listenForRealtimeReports()
{
    const q =
    query(
    reportsCollection,
    orderBy(
    'createdAt',
    'desc'
    )
    );

    onSnapshot(
    q,
    (snapshot)=>
    {
        const reports = [];

        snapshot.forEach((doc)=>
        {
            reports.push(
            {
                id:doc.id,
                ...doc.data()
            });
        });

        renderLiveReports(
        reports
        );

    });
}

/* =========================
   DASHBOARD RENDER
========================= */

function renderLiveReports(
reports
)
{
    const container =
    document.getElementById(
    'liveReports'
    );

    if(!container)
    {
        return;
    }

    container.innerHTML = '';

    reports.forEach((report)=>
    {
        const card =
        document.createElement('div');

        card.className =
        'feed-item';

        card.innerHTML =
        `
        <div>
            <h4>
            ${report.title}
            </h4>

            <p>
            ${report.description}
            </p>
        </div>

        <div class="feed-badge">
            ${report.severity}
        </div>
        `;

        container.appendChild(card);
    });
}

/* =========================
   OFFLINE SUPPORT
========================= */

window.addEventListener(
'offline',
()=>
{
    showFirebaseToast(
    'Offline mode enabled'
    );
});

window.addEventListener(
'online',
()=>
{
    showFirebaseToast(
    'Cloud sync restored'
    );
});

/* =========================
   TOAST
========================= */

function showFirebaseToast(
message
)
{
    const toast =
    document.createElement('div');

    toast.innerHTML =
    message;

    toast.style.position =
    'fixed';

    toast.style.bottom =
    '20px';

    toast.style.left =
    '50%';

    toast.style.transform =
    'translateX(-50%)';

    toast.style.padding =
    '14px 22px';

    toast.style.borderRadius =
    '14px';

    toast.style.background =
    'rgba(7,16,24,0.92)';

    toast.style.border =
    '1px solid rgba(255,255,255,0.08)';

    toast.style.backdropFilter =
    'blur(12px)';

    toast.style.color =
    'white';

    toast.style.zIndex =
    '999999';

    document.body
    .appendChild(toast);

    setTimeout(()=>
    {
        toast.remove();

    },3000);
}

/* =========================
   DEMO DATA
========================= */

export async function seedDemoReports()
{
    const demoReports =
    [
        {
            title:
            'Vehicle Collision',

            description:
            'Major traffic collision detected',

            severity:
            'CRITICAL',

            latitude:
            13.0827,

            longitude:
            80.2707
        },

        {
            title:
            'Road Flooding',

            description:
            'Heavy waterlogging detected',

            severity:
            'MODERATE',

            latitude:
            13.0627,

            longitude:
            80.2407
        }
    ];

    for(const report of demoReports)
    {
        await saveHazardReport(
        report
        );
    }
}

/* =========================
   STATUS
========================= */

console.log(
'Firebase Cloud System Activated'
);