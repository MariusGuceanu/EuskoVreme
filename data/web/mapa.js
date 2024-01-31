
var markers = [
    ["Irún", 43.3404, -1.7921],
    ["Donostia", 43.3184, -1.9812],
    ["Vitoria", 42.8597, -2.6818],
    ["Mondragon", 43.0600, -2.4944],
    ["Bilbao", 43.2630, -2.9340]
];

var zoom = 7;

var map = L.map('mapid').setView([41.6857693, -5.9423150], zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

for (var i = 0; i < markers.length; i++) {
    var marker = new L.marker([markers[i][1], markers[i][2]])
        .bindPopup(markers[i][0])
        .addTo(map);

    // Añade el evento click al marcador para mostrar el gráfico en el popup
    marker.on("click", function (e) {
        showLineChart(e.latlng, getRandomData());
    });
}

// Función para mostrar un gráfico de líneas en el popup
function showLineChart(latlng, data) {
    var chartContainer = document.createElement("canvas");
    chartContainer.style.width = "44vh";
    chartContainer.style.height = "40vh";

    var popup = L.popup().setLatLng(latlng).setContent(chartContainer);
    popup.addTo(map); // Añadir el popup al mapa para que el contenedor esté en el DOM

    var chart = new Chart(chartContainer, {
        type: "line",
        data: {
            labels: data.labels,
            datasets: [{
                label: "Datos de ejemplo",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                data: data.values
            }]
        }
    });

    // Elimina el contenedor del DOM después de cerrar el popup
    popup.on("remove", function () {
        document.body.removeChild(chartContainer);
    });
}


// Función para obtener datos de ejemplo
function getRandomData() {
    var labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    var values = labels.map(function () {
        return Math.floor(Math.random() * 50) + 50;
    });

    return {
        labels: labels,
        values: values
    };
}
