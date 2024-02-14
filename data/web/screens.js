function cambiarAInicio() {
    const contenidoInicio = document.getElementById('contenidoInicio');
    const contenidoMapa = document.getElementById('contenidoMapa');
    const contenidoPronostico = document.getElementById('contenidoPronostico')

    if (contenidoInicio.style.display === 'none' || contenidoInicio.style.display === '') {
        contenidoInicio.style.display = 'block';
        contenidoMapa.style.display = 'none';
        contenidoPronostico.style.display = 'none'
    }
}
function cambiarAMapa() {
    const contenidoInicio = document.getElementById('contenidoInicio');
    const contenidoMapa = document.getElementById('contenidoMapa');
    const mapa = document.getElementById('mapid')
    const contenidoPronostico = document.getElementById('contenidoPronostico')
    if (contenidoMapa.style.display === 'none' || contenidoMapa.style.display === '') {
        contenidoInicio.style.display = 'none';
        contenidoMapa.style.display = 'block';
        contenidoPronostico.style.display = 'none';
        mapa.style.height = '70vh'
        mapa.style.display = 'block'
    }
}

function cambiarAPronostico() {
    const body = document.getElementById('video-container')
    const contenidoInicio = document.getElementById('contenidoInicio');
    const contenidoMapa = document.getElementById('contenidoMapa');
    const contenidoPronostico = document.getElementById('contenidoPronostico')
    if (contenidoPronostico.style.display === 'none' || contenidoPronostico.style.display === '') {
        contenidoInicio.style.display = 'none';
        contenidoMapa.style.display = 'none';
        contenidoPronostico.style.display = 'block';
        body.style.overflow = 'scroll';
    }
    crearCardsPronostico();
}

function crearCardsPronostico() {
    const municipios = JSON.parse(localStorage.getItem('municipios'))
    const divCards = document.getElementById('cardsPronostico')
    const url = `http://localhost:8087/api/pronosticos/${municipios.join(',')}`
    console.log(url)

    const options3 = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
    }
    fetch(url, options3)
        .then(res => res.json())
        .then(data => {
            let cards = "";
            data.mediciones.forEach(medicion => {
                cards += `<div class="col mb-4">
                <div class="card"> 
                    <div class="card-body"> 
                        <p class="card-text">Temperatura actual: ${medicion.temperatura_actual} ºC</p> 
                        <p class="card-text">Humedad: ${medicion.humedad} %</p>
                        <p class="card-text">Dirección del viento: ${medicion.viento_direccion}</p>
                        <p class="card-text">Velocidad del viento: ${medicion.viento_velocidad} Km/h</p>
                        <p class="card-text">Precipitación: ${medicion.precipitacion}</p>
                        <p class="card-text">Estado del cielo: ${medicion.estado}</p>
                    </div>
                </div>
            </div>`
            });
            divCards.innerHTML = `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">${cards}</div>`;
        })


}