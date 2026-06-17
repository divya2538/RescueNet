const ctx = document.getElementById("analyticsChart");

if (ctx) {
    new Chart(ctx, {
        type: "line",
        data: {
            labels: ["Morning","Noon","Evening","Night"],
            datasets: [
                {
                    label: "Incidents",
                    data: [10,20,15,25],
                    borderColor: "#00e5ff",
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });
}