document.addEventListener('DOMContentLoaded', function() {
    const contenedorResultados = document.getElementById('ultimos-resultados');
    const equipoId = 8381;
    const nombreEquipo = "Club Deportivo Español";
    const apiKey = 'c34c76d263ce42503bfd7d1a807953be';

    function formatearFecha(fechaString) {
        const fecha = new Date(fechaString);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const hora = fecha.toLocaleTimeString("es-AR", { hour: '2-digit', minute: '2-digit' });
        return `${dia}/${mes}/${anio} - ${hora}`;
    }

    async function obtenerUltimosResultados() {
        try {
            const respuesta = await fetch(`https://v3.football.api-sports.io/fixtures?team=${equipoId}&last=5`, {
                method: 'GET',
                headers: {
                    'x-apisports-key': apiKey
                }
            });

            const datos = await respuesta.json();

            if (datos.results === 0 || !datos.response || datos.response.length === 0) {
                contenedorResultados.innerHTML = '<p class="error-mensaje">No se encontraron resultados recientes.</p>';
                return;
            }

            let htmlResultados = '';

            datos.response.forEach(partido => {
                const fecha = formatearFecha(partido.fixture.date);
                const liga = partido.league.name;
                const ronda = partido.league.round;
                const equipoLocal = partido.teams.home;
                const equipoVisitante = partido.teams.away;
                const golesLocal = partido.goals.home;
                const golesVisitante = partido.goals.away;
                const estadio = partido.fixture.venue?.name || 'No disponible';

                const esLocal = equipoLocal.name === nombreEquipo;
                const esVisitante = equipoVisitante.name === nombreEquipo;

                let resultadoClase = 'empate';
                let resultadoTexto = 'Empate';

                if (golesLocal > golesVisitante) {
                    if (esLocal) {
                        resultadoClase = 'ganador';
                        resultadoTexto = 'Victoria';
                    } else {
                        resultadoClase = 'perdedor';
                        resultadoTexto = 'Derrota';
                    }
                } else if (golesVisitante > golesLocal) {
                    if (esVisitante) {
                        resultadoClase = 'ganador';
                        resultadoTexto = 'Victoria';
                    } else {
                        resultadoClase = 'perdedor';
                        resultadoTexto = 'Derrota';
                    }
                }

                htmlResultados += `
                    <div class="resultado-api">
                        <div class="resultado-api-header">
                            <span>${liga}</span>
                            <span>${ronda}</span>
                        </div>
                        <div class="resultado-api-equipos">
                            <div class="resultado-api-equipo ${esLocal ? resultadoClase : ''}">
                                <img src="${equipoLocal.logo || '/img/placeholder.svg'}" alt="${equipoLocal.name}" class="resultado-api-logo">
                                <span class="resultado-api-nombre">${equipoLocal.name}</span>
                            </div>
                            <div class="resultado-api-score">
                                <div class="resultado-api-marcador">${golesLocal} - ${golesVisitante}</div>
                                <div class="resultado-api-estado ${resultadoClase}">${resultadoTexto}</div>
                            </div>
                            <div class="resultado-api-equipo ${esVisitante ? resultadoClase : ''}">
                                <img src="${equipoVisitante.logo || '/img/placeholder.svg'}" alt="${equipoVisitante.name}" class="resultado-api-logo">
                                <span class="resultado-api-nombre">${equipoVisitante.name}</span>
                            </div>
                        </div>
                        <div class="resultado-api-info">
                            <div class="resultado-api-info-item">
                                <i class="fas fa-calendar"></i>
                                <span>${fecha}</span>
                            </div>
                            <div class="resultado-api-info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${estadio}</span>
                            </div>
                        </div>
                    </div>
                `;
            });

            contenedorResultados.innerHTML = htmlResultados;

        } catch (error) {
            console.error('Error al obtener los últimos resultados:', error);
            contenedorResultados.innerHTML = '<p class="error-mensaje">Ocurrió un error al cargar los últimos resultados.</p>';
        }
    }

    if (contenedorResultados) {
        obtenerUltimosResultados();
    }
});