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
    const body = document.getElementById('letra')
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
    fetch(url)
        .then(res => res.json())
        .then(data => {
            let cards = "";
            data.mediciones.forEach(medicion => {
                cards += `<div id="cardPronostico">  
                <p>Temperatura actual: ${medicion.temperatura_actual}</p>
                <p>Humedad: ${medicion.humedad}</p>
                <p>Dirección del viento: ${medicion.viento_direccion}</p>
                <p>Velocidad del viento:${medicion.viento_velocidad}</p>
                <p>Precipitación: ${medicion.precipitacion}</p>
                <p>Estado del cielo:${medicion.estado}</p>
              </div>`
            });
            divCards.innerHTML = cards
        })


}