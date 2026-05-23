let emergencyTriggered = false;

window.addEventListener('devicemotion', (event) => {

  const acc = event.accelerationIncludingGravity;

  const totalForce = Math.abs(acc.x) +
                     Math.abs(acc.y) +
                     Math.abs(acc.z);

  if(totalForce > 45 && !emergencyTriggered) {

    emergencyTriggered = true;

    showEmergencyPopup();

  }

});

function showEmergencyPopup() {

  const popup = document.createElement('div');

  popup.classList.add('emergency-popup');

  popup.innerHTML = `

    <h1>Possible Accident Detected</h1>
    <p>SOS will trigger in 10 seconds</p>
    <button onclick="cancelSOS()">Cancel</button>

  `;

  document.body.appendChild(popup);

  setTimeout(() => {

    triggerSOS();

  }, 10000);

}
