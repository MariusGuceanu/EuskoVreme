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
    const contenidoInicio = document.getElementById('contenidoInicio');
    const contenidoMapa = document.getElementById('contenidoMapa');
    const contenidoPronostico = document.getElementById('contenidoPronostico')
    if (contenidoPronostico.style.display === 'none' || contenidoPronostico.style.display === '') {
        contenidoInicio.style.display = 'none';
        contenidoMapa.style.display = 'none';
        contenidoPronostico.style.display = 'block';
    }
}

