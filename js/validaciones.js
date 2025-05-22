document.addEventListener('DOMContentLoaded', function() {
    // Formulario de contacto
    const formularioContacto = document.getElementById('formulario-contacto');
    
    if (formularioContacto) {
        formularioContacto.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores de los campos
            const nombre = document.getElementById('nombre').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const mensaje = document.getElementById('mensaje').value.trim();
            
            // Validar campos
            let esValido = true;
            
            // Validar nombre
            if (nombre === '') {
                mostrarError('nombre', 'Por favor, ingresa tu nombre');
                esValido = false;
            } else {
                limpiarError('nombre');
            }
            
            // Validar email
            if (email === '') {
                mostrarError('email', 'Por favor, ingresa tu email');
                esValido = false;
            } else if (!validarEmail(email)) {
                mostrarError('email', 'Por favor, ingresa un email válido');
                esValido = false;
            } else {
                limpiarError('email');
            }
            
            // Validar teléfono (opcional)
            if (telefono !== '' && !validarTelefono(telefono)) {
                mostrarError('telefono', 'Por favor, ingresa un teléfono válido');
                esValido = false;
            } else {
                limpiarError('telefono');
            }
            
            // Validar mensaje
            if (mensaje === '') {
                mostrarError('mensaje', 'Por favor, ingresa tu mensaje');
                esValido = false;
            } else {
                limpiarError('mensaje');
            }
            
            // Si todo es válido, enviar el formulario
            if (esValido) {
                // Aquí iría el código para enviar el formulario
                alert('¡Formulario enviado con éxito! Nos pondremos en contacto contigo pronto.');
                formularioContacto.reset();
            }
        });
    }
    
    // Formulario de socios
    const formularioSocios = document.getElementById('formulario-socios');
    
    if (formularioSocios) {
        formularioSocios.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener los valores de los campos
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const dni = document.getElementById('dni').value.trim();
            const email = document.getElementById('email').value.trim();
            const telefono = document.getElementById('telefono').value.trim();
            const direccion = document.getElementById('direccion').value.trim();
            const categoria = document.getElementById('categoria').value;
            
            // Validar campos
            let esValido = true;
            
            // Validar nombre
            if (nombre === '') {
                mostrarError('nombre', 'Por favor, ingresa tu nombre');
                esValido = false;
            } else {
                limpiarError('nombre');
            }
            
            // Validar apellido
            if (apellido === '') {
                mostrarError('apellido', 'Por favor, ingresa tu apellido');
                esValido = false;
            } else {
                limpiarError('apellido');
            }
            
            // Validar DNI
            if (dni === '') {
                mostrarError('dni', 'Por favor, ingresa tu DNI');
                esValido = false;
            } else if (!validarDNI(dni)) {
                mostrarError('dni', 'Por favor, ingresa un DNI válido');
                esValido = false;
            } else {
                limpiarError('dni');
            }
            
            // Validar email
            if (email === '') {
                mostrarError('email', 'Por favor, ingresa tu email');
                esValido = false;
            } else if (!validarEmail(email)) {
                mostrarError('email', 'Por favor, ingresa un email válido');
                esValido = false;
            } else {
                limpiarError('email');
            }
            
            // Validar teléfono
            if (telefono === '') {
                mostrarError('telefono', 'Por favor, ingresa tu teléfono');
                esValido = false;
            } else if (!validarTelefono(telefono)) {
                mostrarError('telefono', 'Por favor, ingresa un teléfono válido');
                esValido = false;
            } else {
                limpiarError('telefono');
            }
            
            // Validar dirección
            if (direccion === '') {
                mostrarError('direccion', 'Por favor, ingresa tu dirección');
                esValido = false;
            } else {
                limpiarError('direccion');
            }
            
            // Validar categoría
            if (categoria === '') {
                mostrarError('categoria', 'Por favor, selecciona una categoría');
                esValido = false;
            } else {
                limpiarError('categoria');
            }
            
            // Si todo es válido, enviar el formulario
            if (esValido) {
                // Aquí iría el código para enviar el formulario
                alert('¡Formulario de socio enviado con éxito! Nos pondremos en contacto contigo pronto.');
                formularioSocios.reset();
            }
        });
    }
    
    // Funciones auxiliares
    function mostrarError(id, mensaje) {
        const elemento = document.getElementById(id);
        const contenedorError = document.getElementById(`${id}-error`);
        
        elemento.classList.add('error');
        
        if (contenedorError) {
            contenedorError.textContent = mensaje;
        } else {
            const nuevoContenedorError = document.createElement('div');
            nuevoContenedorError.id = `${id}-error`;
            nuevoContenedorError.className = 'mensaje-error';
            nuevoContenedorError.textContent = mensaje;
            
            elemento.parentNode.insertBefore(nuevoContenedorError, elemento.nextSibling);
        }
    }
    
    function limpiarError(id) {
        const elemento = document.getElementById(id);
        const contenedorError = document.getElementById(`${id}-error`);
        
        elemento.classList.remove('error');
        
        if (contenedorError) {
            contenedorError.textContent = '';
        }
    }
    
    function validarEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }
    
    function validarTelefono(telefono) {
        const regex = /^[0-9\s\-\+$$$$]{8,15}$/;
        return regex.test(telefono);
    }
    
    function validarDNI(dni) {
        const regex = /^[0-9]{7,8}$/;
        return regex.test(dni);
    }
});