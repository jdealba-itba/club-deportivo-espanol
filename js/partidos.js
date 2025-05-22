document.addEventListener('DOMContentLoaded', function() {
    // Contenedor donde se mostrarán los partidos
    const contenedorPartidos = document.getElementById('proximos-partidos');
    
    // ID del equipo (Club Deportivo Español)
    const equipoId = 8381;
    
    // API Key proporcionada
    const apiKey = 'c34c76d263ce42503bfd7d1a807953be';
    
    // Función para formatear la fecha
    function formatearFecha(fechaString) {
        const fecha = new Date(fechaString);
        const dia = fecha.getDate().toString().padStart(2, '0');
        const mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const anio = fecha.getFullYear();
        const hora = fecha.getHours().toString().padStart(2, '0');
        const minutos = fecha.getMinutes().toString().padStart(2, '0');
        
        return {
            fecha: `${dia}/${mes}/${anio}`,
            hora: `${hora}:${minutos} hs`
        };
    }
    
    // Función para obtener los próximos partidos
    async function obtenerProximosPartidos() {
        try {
            // Realizar la petición a la API
            const respuesta = await fetch(`https://v3.football.api-sports.io/fixtures?team=${equipoId}&next=5`, {
                method: 'GET',
                headers: {
                    'x-rapidapi-key': apiKey,
                    'x-rapidapi-host': 'v3.football.api-sports.io'
                }
            });
            
            // Convertir la respuesta a JSON
            const datos = await respuesta.json();
            
            // Verificar si hay datos
            if (datos.results === 0 || !datos.response || datos.response.length === 0) {
                contenedorPartidos.innerHTML = '<p class="error-mensaje">No se encontraron próximos partidos programados.</p>';
                return;
            }
            
            // Generar el HTML para cada partido
            let htmlPartidos = '';
            
            datos.response.forEach(partido => {
                const fechaHora = formatearFecha(partido.fixture.date);
                const liga = partido.league.name;
                const ronda = partido.league.round;
                const equipoLocal = partido.teams.home;
                const equipoVisitante = partido.teams.away;
                const estadio = partido.fixture.venue.name || 'Por confirmar';
                const ciudad = partido.fixture.venue.city || '';
                
                htmlPartidos += `
                    <div class="partido-api">
                        <div class="partido-api-header">
                            <span>${liga}</span>
                            <span>${ronda}</span>
                        </div>
                        <div class="partido-api-equipos">
                            <div class="partido-api-equipo">
                                <img src="${equipoLocal.logo || '/img/placeholder.svg?height=60&width=60'}" alt="${equipoLocal.name}" class="partido-api-logo">
                                <span class="partido-api-nombre">${equipoLocal.name}</span>
                            </div>
                            <div class="partido-api-vs">VS</div>
                            <div class="partido-api-equipo">
                                <img src="${equipoVisitante.logo || '/img/placeholder.svg?height=60&width=60'}" alt="${equipoVisitante.name}" class="partido-api-logo">
                                <span class="partido-api-nombre">${equipoVisitante.name}</span>
                            </div>
                        </div>
                        <div class="partido-api-info">
                            <div class="partido-api-info-item">
                                <i class="fas fa-calendar"></i>
                                <span>${fechaHora.fecha}</span>
                            </div>
                            <div class="partido-api-info-item">
                                <i class="fas fa-clock"></i>
                                <span>${fechaHora.hora}</span>
                            </div>
                            <div class="partido-api-info-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${estadio}${ciudad ? ', ' + ciudad : ''}</span>
                            </div>
                        </div>
                    </div>
                `;
            });
            
            // Insertar el HTML en el contenedor
            contenedorPartidos.innerHTML = htmlPartidos;
            
        } catch (error) {
            console.error('Error al obtener los próximos partidos:', error);
            contenedorPartidos.innerHTML = '<p class="error-mensaje">Ocurrió un error al cargar los próximos partidos. Por favor, intenta nuevamente más tarde.</p>';
        }
    }
    
    // Verificar si existe el contenedor antes de llamar a la función
    if (contenedorPartidos) {
        // Llamar a la función para obtener los próximos partidos
        obtenerProximosPartidos();
    }
});