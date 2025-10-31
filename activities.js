// Data storage
let walkData = {
    labels: [],
    distances: []
};

let sleepData = {
    labels: [],
    hours: []
};

let weightData = {
    labels: [],
    weights: []
};

// Chart instances
let walkChart = null;
let sleepChart = null;
let weightChart = null;

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', function() {
    initWalkChart();
    initSleepChart();
    initWeightChart();
    setupFormListeners();
    loadSampleData(); // Remove this if you don't want sample data
});

// Initialize Walk Chart (Bar Chart)
function initWalkChart() {
    const ctx = document.getElementById('walkChart').getContext('2d');
    walkChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: walkData.labels,
            datasets: [{
                label: 'Distance (miles)',
                data: walkData.distances,
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Distance (miles)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

// Initialize Sleep Chart (Line Chart)
function initSleepChart() {
    const ctx = document.getElementById('sleepChart').getContext('2d');
    sleepChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: sleepData.labels,
            datasets: [{
                label: 'Sleep Duration (hours)',
                data: sleepData.hours,
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(153, 102, 255, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Hours'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

// Initialize Weight Chart (Line Chart)
function initWeightChart() {
    const ctx = document.getElementById('weightChart').getContext('2d');
    weightChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: weightData.labels,
            datasets: [{
                label: 'Weight (lbs)',
                data: weightData.weights,
                backgroundColor: 'rgba(255, 159, 64, 0.2)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 3,
                pointBackgroundColor: 'rgba(255, 159, 64, 1)',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Weight (lbs)'
                    }
                }
            },
            plugins: {
                legend: {
                    display: true
                }
            }
        }
    });
}

// Setup form listeners
function setupFormListeners() {
    // Walk form
    document.getElementById('walkForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const date = document.getElementById('walkdate').value;
        const time = document.getElementById('walktime').value;
        const distance = parseFloat(document.getElementById('walkduration').value);
        
        if (date && time && !isNaN(distance)) {
            const label = `${date} ${time}`;
            walkData.labels.push(label);
            walkData.distances.push(distance);
            
            updateWalkChart();
            this.reset();
            alert('Walk added successfully!');
        }
    });
    
    // Sleep form
    document.getElementById('sleepForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const date = document.getElementById('sleepdate').value;
        const duration = parseFloat(document.getElementById('sleepduration').value);
        
        if (date && !isNaN(duration)) {
            sleepData.labels.push(date);
            sleepData.hours.push(duration);
            
            updateSleepChart();
            this.reset();
            alert('Sleep session added successfully!');
        }
    });
    
    // Weight form
    document.getElementById('weightForm').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const date = document.getElementById('weightdate').value;
        const weight = parseFloat(document.getElementById('weightvalue').value);
        
        if (date && !isNaN(weight)) {
            weightData.labels.push(date);
            weightData.weights.push(weight);
            
            updateWeightChart();
            this.reset();
            alert('Weight entry added successfully!');
        }
    });
}

// Update charts
function updateWalkChart() {
    walkChart.data.labels = walkData.labels;
    walkChart.data.datasets[0].data = walkData.distances;
    walkChart.update();
}

function updateSleepChart() {
    sleepChart.data.labels = sleepData.labels;
    sleepChart.data.datasets[0].data = sleepData.hours;
    sleepChart.update();
}

function updateWeightChart() {
    weightChart.data.labels = weightData.labels;
    weightChart.data.datasets[0].data = weightData.weights;
    weightChart.update();
}

// Load sample data (optional - remove if not needed)
function loadSampleData() {
    // Sample walk data
    walkData.labels = ['2024-01-01 08:00', '2024-01-02 09:00', '2024-01-03 07:30', '2024-01-04 08:15'];
    walkData.distances = [1.5, 2.0, 1.8, 2.3];
    updateWalkChart();
    
    // Sample sleep data
    sleepData.labels = ['2024-01-01', '2024-01-02', '2024-01-03', '2024-01-04', '2024-01-05'];
    sleepData.hours = [8, 7.5, 9, 8.5, 7];
    updateSleepChart();
    
    // Sample weight data
    weightData.labels = ['2024-01-01', '2024-01-08', '2024-01-15', '2024-01-22', '2024-01-29'];
    weightData.weights = [45.2, 45.5, 45.3, 45.8, 46.0];
    updateWeightChart();
}