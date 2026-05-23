const recognition = new webkitSpeechRecognition();

recognition.continuous = false;
recognition.lang = 'en-US';

function startVoiceAI() {

  recognition.start();

}

recognition.onresult = (event) => {

  const transcript = event.results[0][0].transcript;

  const result = analyzeEmergency(transcript);

  console.log(result);

};
