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

async function crearCardsPronostico() {
    const tokenEuskalmet = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJtZXQwMS5hcGlrZXkiLCJpc3MiOiJJRVMgUExBSUFVTkRJIEJISSBJUlVOIiwiZXhwIjoyMjM4MTMxMDAyLCJ2ZXJzaW9uIjoiMS4wLjAiLCJpYXQiOjE2Mzk3NDc5MDcsImVtYWlsIjoiaWtjZXdAcGxhaWF1bmRpLm5ldCJ9.U7-jMY_jTG-Buv0upjjZDLY3dqKe8HzE5Zc2A75JBISEw8YI4-6-hJYPwp1flWhnZr34ubViMZFIM9fFixfLZ0P9selmrkCnQ1LJWCzM-iG58KMxiHVRHVEAzSC_Eog0-QdIwn-Sag_g2TmXLklHFxJFg-9p1kSTcUjpN5vFO1OzSaDZtvipWkWtpoa-LZgF-1_BAg9EbYfEl0U4_eSYa33sjKP3llYbPzfjQIlzIKq-n4Hzq5_AHCtANhkLNGoWf760l1tuSWBolgXOKk7p6FrCARX_NMs8-Pd3a73HbJakto6cLWscX3AYDkszC9zc7dFAsx1bc8Ho1aYRvALtyQ"

    const optionsEuskalmet = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${tokenEuskalmet}`,
        },
        mode: 'cors',
        credentials: 'same-origin'
    }

    const fechaHoy = new Date()
    const fechaHoyAnio = fechaHoy.getFullYear()
    const fechaHoyMes = fechaHoy.getMonth() + 1 < 10
        ? `0${(fechaHoy.getMonth() + 1)}`
        : fechaHoy.getMonth() + 1
    const fechaHoyDia = fechaHoy.getDate() < 10
        ? `0${(fechaHoy.getDate())}`
        : fechaHoy.getDate()
    const fechaHoyTodoJunto = `${fechaHoyAnio}${fechaHoyMes}${fechaHoyDia}`

    const municipios = JSON.parse(localStorage.getItem('municipios'))
    const municipiosIds = municipios.map(m => m.id)
    console.log(municipiosIds)
    const divCards = document.getElementById('cardsPronostico')
    const url = `http://localhost:8087/api/pronosticos/${municipiosIds.join(',')}`
    console.log(url)
    let dataMedicion
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
            dataMedicion = data;
            let promises = dataMedicion.mediciones.map(medicion => {
                const ciudad = municipios.find(m => m.id == medicion.localidad_id.id);
                const apiUrl = `https://api.euskadi.eus/euskalmet/weather/regions/basque_country/zones/${ciudad.zona}/locations/${ciudad.localidad_id}/forecast/at/${fechaHoyAnio}/${fechaHoyMes}/${fechaHoyDia}/for/${fechaHoyTodoJunto}`;

                return fetch(apiUrl, optionsEuskalmet)
                    .then(resEuskalmet => resEuskalmet.json())
                    .then(dataEuskalmet => {
                        console.log(dataEuskalmet)
                        const forecast = dataEuskalmet.forecastText.SPANISH;
                        return `<div title="${forecast}" class="col mb-4">
                                <div class="card"> 
                                    <div class="card-body">
                                        <p style="font-size:medium" class="card-text">Municipio: ${medicion.localidad_id.localidad_id}</p>  
                                        <p style="font-size:medium" class="card-text">Temperatura actual: ${medicion.temperatura_actual} ºC</p> 
                                        <p style="font-size:medium" class="card-text">Humedad: ${medicion.humedad} %</p>
                                        <p style="font-size:medium" class="card-text">Dirección del viento: ${medicion.viento_direccion}</p>
                                        <p style="font-size:medium" class="card-text">Velocidad del viento: ${medicion.viento_velocidad} Km/h</p>
                                        <p style="font-size:medium" class="card-text">Precipitación: ${medicion.precipitacion}</p>
                                        <p style="font-size:medium" class="card-text">Estado del cielo: ${medicion.estado}</p>
                                    </div>
                                </div>
                            </div>`;
                    });
            });

            Promise.all(promises)
                .then(cards => {
                    divCards.innerHTML = `<div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-4">${cards.join('')}</div>`;
                });
        });

}

async function PronosEuskalmet(municipioEuskalmet) {

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    return data.forecastText.SPANISH
}