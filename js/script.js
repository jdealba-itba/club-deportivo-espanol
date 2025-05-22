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
    let currentSlide = 0;
    
    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('actual'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('actual');
    }
    
    if (prevBtn && nextBtn && slides.length > 0) {
        prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
        nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));
        
        // Cambio automático de slides cada 5 segundos
        setInterval(() => showSlide(currentSlide + 1), 5000);
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
});