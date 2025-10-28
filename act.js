const data = [
    { label: "12/23", value: 3 },
    { label: "1/1", value: 2 },
    { label: "4/5", value: 10 },
    { label: "10/1", value: 4 },
    { label: "10/31", value: 3 }
  ];

  
  // Get the chart container
  const chart = document.getElementById("barChart");
  
  // Find max value for scaling
  const maxValue = Math.max(...data.map(d => d.value));
  
  // Generate bars dynamically
  data.forEach(item => {
    const barContainer = document.createElement("div");
    barContainer.style.display = "flex";
    barContainer.style.flexDirection = "column";
    barContainer.style.alignItems = "center";
  
    const bar = document.createElement("div");
    bar.classList.add("bar");
    bar.style.height = `${(item.value / maxValue) * 100}%`;
    bar.textContent = item.value;
  
    const label = document.createElement("div");
    label.classList.add("label");
    label.textContent = item.label;
  
    barContainer.appendChild(bar);
    barContainer.appendChild(label);
    chart.appendChild(barContainer);
    });