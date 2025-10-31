document.addEventListener('DOMContentLoaded', () => {
    const alarmForm = document.getElementById('alarmForm');
    const alarmList = document.getElementById('alarmList');
  
    alarmForm.addEventListener('submit', function (e) {
      e.preventDefault();
  
      const desc = document.getElementById('alarmDesc').value.trim();
      const time = document.getElementById('alarmTime').value;
  
      if (!desc || !time) {
        alert('Please fill in both fields.');
        return;
      }
  
      const li = document.createElement('li');
      li.innerHTML = `
        <strong>${desc}</strong> at <em>${time}</em>
        <button class="delete-btn" type="button">Delete</button>
      `;
      alarmList.appendChild(li);
  
      alarmForm.reset();
      alert('Alarm added!');
    });
         function delt(event) {
            if (button.onclick === "Delete") {
            event.target.parentNode.remove();
          }
       }
     
        ul.addEventListener("click", delt);
        
    });
