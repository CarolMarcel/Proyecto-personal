document.addEventListener("DOMContentLoaded", () => {
    // --- REFERENCIAS DOM ---
    const iconoCarrito = document.getElementById("icono-carrito");
    const menuCarrito = document.getElementById("menu-carrito");
    const abrirFormulario = document.getElementById("abrirFormulario");
    const modalFormulario = document.getElementById("formularioPop");
    const cerrarFormulario = document.querySelector(".cerrar");
    const formulario = document.getElementById("formularioContacto");
    const estado = document.getElementById("estadoEnvio");
    const cerrarCarrito = document.getElementById("cerrarCarrito");

    // --- TOGGLE CARRITO LATERAL ---
    iconoCarrito.addEventListener("click", () => {
        menuCarrito.classList.toggle("activo");
    });

    // --- MOSTRAR FORMULARIO COMO MODAL ---
    abrirFormulario.addEventListener("click", () => {
        modalFormulario.classList.add("activo");
    });

    // --- CERRAR MODAL CON LA X ---
    cerrarFormulario.addEventListener("click", () => {
        modalFormulario.classList.remove("activo");
    });

    // --- CERRAR MODAL CLIC FUERA DEL FORMULARIO ---
    window.addEventListener("click", (e) => {
        // Si el usuario hace clic fuera del contenido del modal (en el fondo oscuro)
        if (e.target === modalFormulario) {
            // Se cierra el modal quitando la clase 'activo'
            modalFormulario.classList.remove("activo");
        }
    });

    // --- CERRAR CARRITO CON LA X ---
    cerrarCarrito.addEventListener("click", () => {
        // Cuando el usuario hace clic en la X del carrito, se oculta quitando la clase 'activo'
        menuCarrito.classList.remove("activo");
    });

    // --- VALIDACIONES DEL FORMULARIO ---
    formulario.addEventListener("submit", (e) => {
        e.preventDefault();   // Previene que el formulario se envíe de forma tradicional

        // Captura y limpia los datos de cada campo
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const edad = parseInt(document.getElementById("edad").value);
        const mensaje = document.getElementById("mensaje").value.trim();
        const terminos = document.getElementById("terminos").checked;

        // Validación de nombre: mínimo 3 letras
        if (nombre.length < 3) {
            estado.textContent = "⚠️ El nombre debe tener al menos 3 caracteres.";
            estado.style.color = "red";
            return;
        }

        // Validación de email: formato básico con arroba y dominio
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            estado.textContent = "⚠️ El correo electrónico debe incluir '@' y un punto válido.";
            estado.style.color = "red";
            return;
        }

        // Validación de edad: debe estar entre 18 y 99 años
        if (isNaN(edad) || edad < 18 || edad > 99) {
            estado.textContent = "⚠️ La edad debe estar entre 18 y 99 años.";
            estado.style.color = "red";
            return;
        }

        // Validación de mensaje: al menos 10 caracteres
        if (mensaje.length < 10) {
            estado.textContent = "⚠️ El mensaje debe tener al menos 10 caracteres.";
            estado.style.color = "red";
            return;
        }

        // Validación de checkbox de términos
        if (!terminos) {
            estado.textContent = "⚠️ Debes aceptar los términos.";
            estado.style.color = "red";
            return;
        }

        // Si todo está correcto, limpia el formulario y muestra mensaje de éxito
        formulario.reset();
        estado.textContent = "✅ Formulario enviado correctamente.";
        estado.style.color = "green";
    });
});

// --- FUNCIONES DEL CARRITO ---
let servicios = [];  // Lista de servicios agregados al carrito
let total = 0;   // Total acumulado en CLP

// Actualizar el contador del ícono del carrito
function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    contador.textContent = servicios.length;    // Muestra cuántos servicios hay
}

// Agregar un servicio al carrito
function agregarServicio(nombre, precio) {
    servicios.push({ nombre, precio });   // Agrega objeto al array
    total += precio;    // Suma el precio al total
    actualizarContador();    // Actualiza el número del carrito

    const lista = document.getElementById("listaServicios");
    const index = servicios.length - 1;

    // Crea un nuevo ítem con botón para eliminar
    const item = document.createElement("li");
    item.innerHTML = `${nombre} - $${precio.toLocaleString('es-CL')} <button onclick="eliminarServicio(${index})" style="margin-left: 10px; color: red; background: none; border: none; cursor: pointer;">&times;</button>`;
    lista.appendChild(item);   // Lo agrega a la lista visual

    document.getElementById("totalServicios").textContent = total.toLocaleString('es-CL');
}

// Eliminar un servicio del carrito
function eliminarServicio(index) {
    total -= servicios[index].precio;    // Resta el precio del total
    servicios.splice(index, 1);     // Elimina el servicio del array
    actualizarContador();      // Actualiza contador

    // Vacía la lista HTML
    const lista = document.getElementById("listaServicios");
    lista.innerHTML = "";
    // Vuelve a renderizar cada ítem actualizado
    servicios.forEach((servicio, i) => {
        const item = document.createElement("li");
        item.innerHTML = `${servicio.nombre} - $${servicio.precio.toLocaleString('es-CL')} <button onclick="eliminarServicio(${i})" style="margin-left: 10px; color: red; background: none; border: none; cursor: pointer;">&times;</button>`;
        lista.appendChild(item);
    });

    document.getElementById("totalServicios").textContent = total.toLocaleString('es-CL');
}
