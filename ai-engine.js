export function analyzeEmergency(text) {

  text = text.toLowerCase();

  let severity = 'Minor';
  let confidence = 50;
  let category = 'General';

  if(text.includes('fire')) {
    severity = 'Critical';
    confidence = 95;
    category = 'Fire Emergency';
  }

  if(text.includes('accident')) {
    severity = 'Critical';
    confidence = 92;
    category = 'Vehicle Crash';
  }

  if(text.includes('blood')) {
    severity = 'Critical';
    confidence = 96;
    category = 'Medical Emergency';
  }

  if(text.includes('breakdown')) {
    severity = 'Moderate';
    confidence = 80;
    category = 'Vehicle Breakdown';
  }

  return {
    severity,
    confidence,
    category,
    recommendation: getRecommendation(category)
  };

}

function getRecommendation(category) {

  switch(category) {

    case 'Fire Emergency':
      return 'Dispatch fire response team immediately';

    case 'Medical Emergency':
      return 'Dispatch nearest ambulance';

    case 'Vehicle Crash':
      return 'Notify police and ambulance services';

    default:
      return 'Monitor situation';

  }

}
