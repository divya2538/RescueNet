/* =========================
   RESCUENET AI IMAGE ANALYSIS
========================= */

/*
FEATURES:
- Accident image upload
- AI demo analysis
- Severity scoring
- Confidence %
- Future Gemini Vision support
*/

/* =========================
   ELEMENTS
========================= */

const uploadInput =
document.getElementById(
'imageUpload'
);

const previewImage =
document.getElementById(
'imagePreview'
);

const analysisResult =
document.getElementById(
'imageAnalysisResult'
);

/* =========================
   CHECK ELEMENTS
========================= */

if(uploadInput)
{
    uploadInput.addEventListener(
    'change',
    handleImageUpload
    );
}

/* =========================
   HANDLE IMAGE
========================= */

function handleImageUpload(event)
{
    const file =
    event.target.files[0];

    if(!file)
    {
        return;
    }

    const reader =
    new FileReader();

    reader.onload =
    (e)=>
    {
        previewUploadedImage(
        e.target.result
        );

        startAIAnalysis(
        file.name
        );
    };

    reader.readAsDataURL(file);
}

/* =========================
   PREVIEW
========================= */

function previewUploadedImage(src)
{
    if(previewImage)
    {
        previewImage.src = src;

        previewImage.style.display =
        'block';
    }
}

/* =========================
   AI ANALYSIS
========================= */

function startAIAnalysis(fileName)
{
    showLoading();

    setTimeout(()=>
    {
        const result =
        generateAnalysis(
        fileName
        );

        renderAnalysis(
        result
        );

    },2500);
}

/* =========================
   GENERATE DEMO AI
========================= */

function generateAnalysis(name)
{
    const possibilities =
    [
        {
            type:
            'Vehicle Collision',

            severity:
            'CRITICAL',

            confidence:
            96,

            detections:
            [
                'Vehicle Damage',
                'Airbag Deployment',
                'Road Obstruction'
            ],

            recommendations:
            [
                'Dispatch ambulance immediately',

                'Alert traffic control',

                'Send police responders'
            ]
        },

        {
            type:
            'Fire Emergency',

            severity:
            'HIGH',

            confidence:
            91,

            detections:
            [
                'Smoke',
                'Flame Detection',
                'Vehicle Fire'
            ],

            recommendations:
            [
                'Dispatch fire rescue',

                'Clear surrounding traffic',

                'Activate emergency route'
            ]
        },

        {
            type:
            'Minor Accident',

            severity:
            'MODERATE',

            confidence:
            82,

            detections:
            [
                'Minor Vehicle Damage',
                'Roadside Incident'
            ],

            recommendations:
            [
                'Send roadside assistance',

                'Monitor traffic buildup'
            ]
        }
    ];

    return possibilities[
    Math.floor(
    Math.random()*possibilities.length
    )];
}

/* =========================
   LOADING
========================= */

function showLoading()
{
    if(!analysisResult)
    {
        return;
    }

    analysisResult.innerHTML =
    `
    <div class="ai-loading">

        <div class="scanner"></div>

        <h3>
        AI Emergency Vision Scanning...
        </h3>

        <p>
        Detecting impact severity and hazards
        </p>

    </div>
    `;
}

/* =========================
   RENDER RESULT
========================= */

function renderAnalysis(result)
{
    if(!analysisResult)
    {
        return;
    }

    analysisResult.innerHTML =
    `
    <div class="analysis-card">

        <h2>
        🚨 AI ANALYSIS COMPLETE
        </h2>

        <div class="analysis-grid">

            <div class="analysis-box">
                <h4>Emergency Type</h4>
                <p>${result.type}</p>
            </div>

            <div class="analysis-box">
                <h4>Severity</h4>
                <p>${result.severity}</p>
            </div>

            <div class="analysis-box">
                <h4>Confidence</h4>
                <p>${result.confidence}%</p>
            </div>

        </div>

        <div class="analysis-section">

            <h3>
            AI Detections
            </h3>

            <ul>
                ${
                    result.detections
                    .map(item=>
                    `<li>${item}</li>`)
                    .join('')
                }
            </ul>

        </div>

        <div class="analysis-section">

            <h3>
            Emergency Recommendations
            </h3>

            <ul>
                ${
                    result.recommendations
                    .map(item=>
                    `<li>${item}</li>`)
                    .join('')
                }
            </ul>

        </div>

        <div class="confidence-meter">

            <div
            class="confidence-fill"
            style="
            width:${result.confidence}%;
            ">
            </div>

        </div>

    </div>
    `;

    styleAIAnalysis();
}

/* =========================
   STYLING
========================= */

function styleAIAnalysis()
{
    const fill =
    document.querySelector(
    '.confidence-fill'
    );

    if(fill)
    {
        fill.style.height =
        '100%';

        fill.style.background =
        'linear-gradient(90deg,#00e5ff,#ff3b3b)';

        fill.style.borderRadius =
        '20px';

        fill.style.transition =
        '1s';
    }

    const meter =
    document.querySelector(
    '.confidence-meter'
    );

    if(meter)
    {
        meter.style.width =
        '100%';

        meter.style.height =
        '16px';

        meter.style.background =
        'rgba(255,255,255,0.08)';

        meter.style.borderRadius =
        '20px';

        meter.style.marginTop =
        '24px';

        meter.style.overflow =
        'hidden';
    }
}

/* =========================
   GEMINI VISION READY
========================= */

export async function analyzeWithGemini(
imageFile
)
{
    /*
    FUTURE GEMINI API INTEGRATION

    send image ->
    Gemini Vision ->
    return severity analysis
    */

    console.log(
    'Gemini Vision Placeholder',
    imageFile
    );
}

/* =========================
   AUTO DISPATCH
========================= */

export function autoDispatchFromAI(
severity
)
{
    if(severity === 'CRITICAL')
    {
        console.log(
        'Dispatching ambulance + police'
        );
    }

    if(severity === 'HIGH')
    {
        console.log(
        'Dispatching fire rescue'
        );
    }
}

/* =========================
   LIVE LOGS
========================= */

setInterval(()=>
{
    console.log(
    'AI Vision Engine Monitoring'
    );

},15000);

/* =========================
   STATUS
========================= */

console.log(
'AI Image Analysis System Activated'
);