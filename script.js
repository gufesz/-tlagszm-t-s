let myChart;

document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', updateChart);
});

function updateChart() {
    const nev = document.getElementById('nev').value;
    const tantargy = document.getElementById('tantargy').value;
    const havijegy = [
        getjegyek('jegy1'),
        getjegyek('jegy2'),
        getjegyek('jegy3'),
        getjegyek('jegy4')
    ];

    const haviatlag = havijegy.map(atlagszamitas);
    const osszatlag = atlagszamitas(haviatlag);

    const xValues = ["Szeptember", "Október", "November", "December", "Átlag"];
    const yValues = [...haviatlag, osszatlag];
    const barColors = ["red", "green", "blue", "orange", "purple"];

    if (myChart) {
        myChart.destroy();
    }

    myChart = new Chart("myChart", {
        type: "bar",
        data: {
            labels: xValues,
            datasets: [{
                backgroundColor: barColors,
                data: yValues
            }]
        },
        options: {
            legend: {display: false},
            title: {
                display: true,
                text: nev + ' - ' + tantargy + ' havi átlagai'
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                        max: 5
                    }
                }]
            }
        }
    });
}

function getjegyek(elementId) {
    const jegyText = document.getElementById(elementId).value;
    return jegyText.split(',').map(grade => Number(grade.trim())).filter(grade => !isNaN(grade) && grade >= 1 && grade <= 5);
}

function atlagszamitas(grades) {
    if (grades.length === 0) return 0;
    const sum = grades.reduce((a, b) => a + b, 0);
    return Math.round((sum / grades.length) * 100) / 100;
}