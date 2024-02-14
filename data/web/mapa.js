
var zoom = 6;

var map = L.map('mapid').setView([41.6857693, -5.9423150], zoom);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

fetch('http://localhost:8087/api/municipios')

    .then(res => res.json())
    .then(data => {
        data.localizaciones.forEach(municipio => {
            var marker = new L.marker([municipio.latitud, municipio.longitud])
                .bindPopup(municipio.nombreMunicipio)
                .addTo(map);

            // Añade el evento click al marcador para mostrar el gráfico en el popup
            marker.on("click", function (e) {
                fetch(`http://localhost:8087/api/pronosticosHoy/${municipio.id}`)
                .then(res => res.json())
                .then(data =>{
                    const temperaturas = data.registros.map(registro => registro.temperatura_actual)
                    showLineChart(e.latlng, temperaturas);
                    console.log(temperaturas)
                })
                let municipios = JSON.parse(localStorage.getItem('municipios')) || []
                if (!municipios.includes(municipio.id))
                    municipios.push(municipio.id)
                else {
                    municipios = municipios.filter(id => id == municipio.id)
                }
                localStorage.setItem('municipios', JSON.stringify(municipios))

            });
        });
    })

// Función para mostrar un gráfico de líneas en el popup
function showLineChart(latlng, data) {
    var chartContainer = document.createElement("canvas");
    chartContainer.style.width = "33vh";
    chartContainer.style.height = "30vh";

    var popup = L.popup().setLatLng(latlng).setContent(chartContainer);
    popup.addTo(map); // Añadir el popup al mapa para que el contenedor esté en el DOM

    var chart = new Chart(chartContainer, {
        type: "line",
        data: {
            labels: data.labels,
            datasets: [{
                label: "Temperatura",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
                data:data
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
    var labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    var values = labels.map(function () {
        return Math.floor(Math.random() * 50) + 50;
    });

    return {
        labels: labels,
        values: values
    };
}

var contenidoPronostico = document.getElementById("contenidoPronostico");

