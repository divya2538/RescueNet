function analyzeEmergency(data) {
    const { speedImpact, rotation, type } = data;

    let score = 20;

    if (speedImpact > 30) score += 40;
    if (rotation > 20) score += 25;
    if (type === "collision") score += 30;

    return {
        riskScore: Math.min(score, 100),
        category:
            score > 80 ? "CRITICAL" :
            score > 60 ? "HIGH" :
            score > 40 ? "MODERATE" : "LOW"
    };
}

module.exports = { analyzeEmergency };