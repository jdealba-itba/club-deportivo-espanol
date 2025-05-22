document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidad del menú móvil
    const botonMenu = document.querySelector('.boton-menu');
    const menu = document.querySelector('.menu');
    
    if (botonMenu) {
        botonMenu.addEventListener('click', function() {
            menu.classList.toggle('activo');
            botonMenu.classList.toggle('activo');
        });
    }
    
    // Funcionalidad del slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.control-prev');
    const nextBtn = document.querySelector('.control-next');
    const indicadores = document.querySelectorAll('.indicador');
    let currentSlide = 0;
    let slideInterval;
    
    function showSlide(n) {
        // Remover clases activas
        slides.forEach(slide => slide.classList.remove('actual'));
        indicadores.forEach(ind => ind.classList.remove('activo'));
        
        // Actualizar índice actual
        currentSlide = (n + slides.length) % slides.length;
        
        // Activar slide e indicador actual
        slides[currentSlide].classList.add('actual');
        indicadores[currentSlide].classList.add('activo');
    }
    
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            showSlide(currentSlide + 1);
        }, 5000);
    }
    
    function resetSlideInterval() {
        clearInterval(slideInterval);
        startSlideInterval();
    }
    
    if (slides.length > 0) {
        // Iniciar slider automático
        startSlideInterval();
        
        // Controles de navegación
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                showSlide(currentSlide - 1);
                resetSlideInterval();
            });
            
            nextBtn.addEventListener('click', () => {
                showSlide(currentSlide + 1);
                resetSlideInterval();
            });
        }
        
        // Indicadores
        indicadores.forEach((indicador, index) => {
            indicador.addEventListener('click', () => {
                showSlide(index);
                resetSlideInterval();
            });
        });
        
        // Pausar slider al hover
        const slider = document.querySelector('.slider');
        if (slider) {
            slider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            slider.addEventListener('mouseleave', () => {
                startSlideInterval();
            });
        }
    }
    
    // Animación al hacer scroll
    const animarAlScroll = () => {
        const elementos = document.querySelectorAll('.animar-entrada');
        
        elementos.forEach(elemento => {
            const posicion = elemento.getBoundingClientRect().top;
            const alturaVentana = window.innerHeight;
            
            if (posicion < alturaVentana * 0.85) {
                elemento.classList.add('visible');
            }
        });
    };
    
    window.addEventListener('scroll', animarAlScroll);
    animarAlScroll(); // Ejecutar al cargar la página

    // Funcionalidad del carrusel de sponsors
    const sponsorsWrapper = document.querySelector('.sponsors-wrapper');
    const sponsorCards = document.querySelectorAll('.sponsor-card');
    const prevSponsorBtn = document.querySelector('.carousel-prev');
    const nextSponsorBtn = document.querySelector('.carousel-next');
    const sponsorDots = document.querySelectorAll('.dot');
    let currentSponsorIndex = 0;
    const cardsPerView = window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : window.innerWidth > 576 ? 2 : 1;
    const totalSlides = Math.ceil(sponsorCards.length / cardsPerView);

    function updateSponsorCarousel() {
        const offset = currentSponsorIndex * -100;
        sponsorsWrapper.style.transform = `translateX(${offset}%)`;
        
        // Actualizar indicadores
        sponsorDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSponsorIndex);
        });
    }

    if (sponsorCards.length > 0) {
        // Configurar el wrapper para el número correcto de tarjetas por vista
        sponsorsWrapper.style.width = `${totalSlides * 100}%`;
        sponsorCards.forEach(card => {
            card.style.width = `${100 / (totalSlides * cardsPerView)}%`;
        });

        // Eventos de navegación
        if (prevSponsorBtn && nextSponsorBtn) {
            prevSponsorBtn.addEventListener('click', () => {
                currentSponsorIndex = (currentSponsorIndex - 1 + totalSlides) % totalSlides;
                updateSponsorCarousel();
            });

            nextSponsorBtn.addEventListener('click', () => {
                currentSponsorIndex = (currentSponsorIndex + 1) % totalSlides;
                updateSponsorCarousel();
            });
        }

        // Eventos de los indicadores
        sponsorDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentSponsorIndex = index;
                updateSponsorCarousel();
            });
        });

        // Actualizar en cambio de tamaño de ventana
        window.addEventListener('resize', () => {
            const newCardsPerView = window.innerWidth > 1024 ? 4 : window.innerWidth > 768 ? 3 : window.innerWidth > 576 ? 2 : 1;
            if (newCardsPerView !== cardsPerView) {
                location.reload();
            }
        });
    }

    // Funcionalidad del formulario de contacto
    const formulario = document.querySelector('.formulario-contacto');
    const mensajeEnvio = document.querySelector('.mensaje-envio');
    
    if (formulario) {
        console.log("Formulario:", formulario);

        formulario.addEventListener('submit', async (e) => {
            e.preventDefault();
            console.log("Input values:", {
                nombre: document.getElementById('nombre').value,
                dni: document.getElementById('dni').value,
                email: document.getElementById('email').value,
                categoria: document.getElementById('categoria').value,
                metodo_pago: document.getElementById('pago').value
            });
            
            // Aquí puedes agregar la lógica para enviar el formulario, como una llamada a la API
            
            // Mostrar mensaje de envío
            mensajeEnvio.classList.add('visible');
            
            // Reiniciar formulario
            formulario.reset();
        });
    }
});