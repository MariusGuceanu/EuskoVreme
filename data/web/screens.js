function cambiarAInicio() {
    const contenidoInicio = document.getElementById('contenidoInicio');
    const contenidoMapa = document.getElementById('contenidoMapa');

    if (contenidoInicio.style.display === 'none' || contenidoInicio.style.display === '') {
        contenidoInicio.style.display = 'block';
        contenidoMapa.style.display = 'none';
    }
}
function cambiarAMapa() {
    const contenidoInicio = document.getElementById('contenidoInicio');
    const contenidoMapa = document.getElementById('contenidoMapa');
    const mapa = document.getElementById('mapid')
    if (contenidoMapa.style.display === 'none' || contenidoMapa.style.display === '') {
        contenidoInicio.style.display = 'none';
        contenidoMapa.style.display = 'block';
        mapa.style.height = '50vh'
        mapa.style.display = 'block'
    }
}