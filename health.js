document.getElementById('medicationTableBody').addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
        deleteMedication(e.target);
    }
});

// Data storage
let weightHistory = [];

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Setup all event listeners
function setupEventListeners() {
    // Medication form
    const medForm = document.getElementById('medicationForm');
    if (medForm) {
        medForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addMedication();
        });
    }
}

// Add condition function
function addCondition() {
    const input = document.getElementById('newcondition');
    const conditionText = input.value.trim();
    
    if (conditionText) {
        const list = document.getElementById('conditionsList');
        const li = document.createElement('li');
        li.innerHTML = `${conditionText} <button onclick="removeCondition(this)">Remove</button>`;
        list.appendChild(li);
        
        input.value = '';
        alert('Condition added successfully!');
    } else {
        alert('Please enter a condition');
    }
}

// Remove condition function
function removeCondition(button) {
    if (confirm('Are you sure you want to remove this condition?')) {
        const li = button.parentElement;
        li.remove();
    }
}

// Add weight entry
function addWeight() {
    const dateInput = document.getElementById('weightDate');
    const weightInput = document.getElementById('weight');
    
    const date = dateInput.value;
    const weight = parseFloat(weightInput.value);
    
    if (!date) {
        alert('Please select a date');
        return;
    }
    
    if (isNaN(weight) || weight <= 0) {
        alert('Please enter a valid weight');
        return;
    }
    
    // Add to history
    weightHistory.push({ date, weight });
    
    // Sort by date (newest first)
    weightHistory.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // Update current weight
    document.getElementById('currentWeight').textContent = weight.toFixed(1);
    
    // Update table
    updateWeightTable();
    
    // Clear inputs
    dateInput.value = '';
    weightInput.value = '';
    
    alert('Weight updated successfully!');
}

// Update weight table
function updateWeightTable() {
    const tbody = document.getElementById('weightTableBody');
    
    if (weightHistory.length === 0) {
        tbody.innerHTML = '<tr class="no-data"><td colspan="3">No weight entries yet</td></tr>';
        return;
    }
    
    tbody.innerHTML = '';
    
    weightHistory.forEach((entry, index) => {
        const row = tbody.insertRow();
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>${entry.weight.toFixed(1)} lbs</td>
            <td><button onclick="deleteWeight(${index})">Remove</button></td>
        `;
    });
}

// Delete weight entry
function deleteWeight(index) {
    if (confirm('Are you sure you want to remove this weight entry?')) {
        weightHistory.splice(index, 1);
        
        // Update current weight if needed
        if (weightHistory.length > 0) {
            document.getElementById('currentWeight').textContent = weightHistory[0].weight.toFixed(1);
        } else {
            document.getElementById('currentWeight').textContent = '--';
        }
        
        updateWeightTable();
    }
}

// Add medication
function addMedication() {
    const medInput = document.getElementById('medtype');
    const instructInput = document.getElementById('justify');
    
    const medName = medInput.value.trim();
    const instructions = instructInput.value.trim();
    
    if (!medName || !instructions) {
        alert('Please fill in both medication name and instructions');
        return;
    }
    
    const tbody = document.getElementById('medicationTableBody');
    const row = tbody.insertRow();
    
    row.innerHTML = `
        <td>${medName}</td>
        <td>${instructions}</td>
        <td><button onclick="deleteMedication(this)">Remove</button></td>
    `;
    
    // Clear inputs
    medInput.value = '';
    instructInput.value = '';
    
    alert('Medication added successfully!');
}

// Delete medication
function deleteMedication(button) {
    if (confirm('Are you sure you want to remove this medication?')) {
        const row = button.parentElement.parentElement;
        row.remove();
    }
}