// --- Formulario con Validaciones y Carrito Estilo Modal ---
document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.getElementById("formularioContacto");
    const estado = document.getElementById("estadoEnvio");
    const carritoIcono = document.getElementById("icono-carrito");
    const menuCarrito = document.getElementById("menu-carrito");
    const contadorCarrito = document.getElementById("contador-carrito");
    const icono = document.getElementById("icono-carrito");
    const menu = document.getElementById("menu-carrito");

    if (carritoIcono && menuCarrito) {
        carritoIcono.addEventListener("click", () => {
        menuCarrito.classList.toggle("activo");
    });
}

    if (formulario) {
        formulario.addEventListener("submit", function (e) {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const email = document.getElementById("email").value.trim();
            const edad = parseInt(document.getElementById("edad").value);
            const mensaje = document.getElementById("mensaje").value.trim();
            const terminos = document.getElementById("terminos").checked;

            if (nombre.length < 3) {
                estado.textContent = "El nombre debe tener al menos 3 caracteres.";
                estado.style.color = "red";
                return;
            }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                estado.textContent = "El correo electrónico debe incluir '@' y al menos un punto después.";
                estado.style.color = "red";
                return;
            }
            if (isNaN(edad) || edad < 18 || edad > 99) {
                estado.textContent = "La edad debe estar entre 18 y 99 años.";
                estado.style.color = "red";
                return;
            }
            if (mensaje.length < 10) {
                estado.textContent = "El mensaje debe tener al menos 10 caracteres.";
                estado.style.color = "red";
                return;
            }
            if (!terminos) {
                estado.textContent = "Debes aceptar los términos.";
                estado.style.color = "red";
                return;
            }

            formulario.reset();
            estado.textContent = "Formulario enviado correctamente.";
            estado.style.color = "green";
        });
    }
});

let servicios = [];
let total = 0;

function actualizarContador() {
    const contador = document.getElementById("contador-carrito");
    contador.textContent = servicios.length;
}

function agregarServicio(nombre, precio) {
    servicios.push({ nombre, precio });
    total += precio;
    actualizarContador();

    const lista = document.getElementById("listaServicios");
    const index = servicios.length - 1;
    const item = document.createElement("li");
    item.innerHTML = `${nombre} - $${precio.toLocaleString('es-CL')} <button onclick="eliminarServicio(${index})" style="margin-left: 10px; color: red; background: none; border: none; cursor: pointer;">&times;</button>`;
    lista.appendChild(item);

    document.getElementById("totalServicios").textContent = total.toLocaleString('es-CL');
}

function eliminarServicio(index) {
    total -= servicios[index].precio;
    servicios.splice(index, 1);
    actualizarContador();

    const lista = document.getElementById("listaServicios");
    lista.innerHTML = "";
    servicios.forEach((servicio, i) => {
        const item = document.createElement("li");
        item.innerHTML = `${servicio.nombre} - $${servicio.precio.toLocaleString('es-CL')} <button onclick="eliminarServicio(${i})" style="margin-left: 10px; color: red; background: none; border: none; cursor: pointer;">&times;</button>`;
        lista.appendChild(item);
    });

    document.getElementById("totalServicios").textContent = total.toLocaleString('es-CL');
}

