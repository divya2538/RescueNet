const upload = document.getElementById('imageUpload');
const preview = document.getElementById('preview');

upload.addEventListener('change', (e) => {

  const file = e.target.files[0];

  if(!file) return;

  const reader = new FileReader();

  reader.onload = () => {

    preview.src = reader.result;

    simulateAIAnalysis(file.name);

  };

  reader.readAsDataURL(file);

});

function simulateAIAnalysis(name) {

  let severity = 'Moderate';
  let confidence = 88;

  if(name.includes('fire')) {
    severity = 'Critical';
    confidence = 97;
  }

  document.getElementById('imageResult').innerHTML = `

    <h3>AI Analysis Result</h3>
    <p>Severity: ${severity}</p>
    <p>Confidence: ${confidence}%</p>

  `;

}
