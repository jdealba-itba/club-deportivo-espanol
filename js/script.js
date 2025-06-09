// Menú responsive
document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.querySelector('.boton-menu');
    const menu = document.querySelector('.menu');
    menuBtn.addEventListener('click', function () {
        menu.classList.toggle('activo');
        menuBtn.classList.toggle('activo');
    });

    // Cierra el menú al hacer click en un enlace (en móvil)
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('activo');
            menuBtn.classList.remove('activo');
        });
    });

    // Animación de aparición al hacer scroll (valores y fotos históricas)
    const animarAlScroll = (selector) => {
        const elementos = document.querySelectorAll(selector);
        const observer = new IntersectionObserver((entradas) => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.classList.add('visible');
                }
            });
        }, { threshold: 0.2 });
        elementos.forEach(el => observer.observe(el));
    };
    animarAlScroll('.valor-card');
    animarAlScroll('.foto-historica');

    // Scroll suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(enlace => {
        enlace.addEventListener('click', function (e) {
            const destino = document.querySelector(this.getAttribute('href'));
            if (destino) {
                e.preventDefault();
                destino.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
