 // Gráfico 1
 new Chart(document.getElementById("grafico1"), {
    type: 'bar',
    data: {
      labels: ["Bilbao", "Vitoria", "Irún", "Donostia", "Mondragón"],
      datasets: [
        {
          label: "Temperatura Media (°C)",
          backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
          data: [20, 25, 15, 18, 10]
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Temperatura media en el día de hoy'
      },
      scales: {
        y: {
          min: -10,
          max: 45,
          ticks: {
            stepSize: 10
          }
        }
      }
    }
  });

  // Gráfico 2
  new Chart(document.getElementById("grafico2"), {
    type: 'line',
    data: {
      labels: ["Bilbao", "Vitoria", "Irún", "Donostia", "Mondragón"],
      datasets: [
        {
          label: "Precipitación Media (mm)",
          borderColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850"],
          fill: false,
          data: [10, 15, 5, 8, 12] // Valores ficticios de precipitación media para cada ciudad
        }
      ]
    },
    options: {
      legend: { display: false },
      title: {
        display: true,
        text: 'Precipitación media en el día de hoy'
      },
      scales: {
        y: {
          ticks: {
            stepSize: 2
          }
        }
      }
    }
  });