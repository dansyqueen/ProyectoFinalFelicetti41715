import { obtenerClientes } from "./storage.js";
import { elegirClaseMostrar } from "./habilitarMostrarBoton.js";
import { editarClaseMostrar } from "./habilitarMostrarBoton.js";
import { iniciarSesionMostrar } from "./habilitarMostrarBoton.js";
import { llenarFormularioContacto } from "./contacto.js";
import { guardarListaUsariosStorage } from "./storage.js";

let listaClientes = obtenerClientes();

// Si ya eligió actividad o no, el botón cambia "Elegir actividad o Editar actividad"
const validarTieneActividad = (index) => {
    if(listaClientes[index].actividad == ''){
        elegirClaseMostrar()
    }else{
        editarClaseMostrar();
    }
}

// Uso operador ternario para verificar que todos los input esten completos y/o correctos.
const datosIngresadosNoValidos = () => {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Error. Los datos ingresados no son válidos`
    })
}


const validarFormularioIniciarSesion = (e) => {
    e.preventDefault();

    let usuarioVerificado = false
    usuarioVerificado =  verificarUsuarioYaIngresado();

    const operadorUsuarioVerificado = (usuarioVerificado == true) ? true : false;
    operadorUsuarioVerificado ? usuarioBienvenida() : datosIngresadosNoValidos();
};

// Pinto el header y muestro cartel de bienvenida
// Uso operador ternario
const usuarioBienvenida = () => {
    iniciarSesionMostrar();

    let usuarioIng = document.getElementById('usuarioIng').value;

    let bienvenida = document.getElementById('bienvenida');
    bienvenida.innerText =` ${usuarioIng.toLowerCase()}`;
    llenarFormularioContacto()

    Swal.fire({
        icon: 'success',
        title: `Bienvenido/a ${usuarioIng.toLowerCase()}`,
        timer: 3000
    });

    document.getElementById('iniciar').reset();

    guardarListaUsariosStorage(usuarioIng);

}

// Verifico que el usuario y la contraseña sean correctas
const verificarUsuarioYaIngresado = () => {

    let usuarioIng = document.getElementById('usuarioIng').value.toLowerCase();
    let contraseniaIng = document.getElementById('contraseniaIng').value;
    let verCarrito = document.getElementById('carrito');
    listaClientes = obtenerClientes();

    if (listaClientes) {

        for (let index = 0; index < listaClientes.length; index ++) {
            if(((listaClientes[index].usuario) === usuarioIng) && ((listaClientes[index].contrasenia) === contraseniaIng)){
                verCarrito.innerHTML = `<p>${listaClientes[index].precio}$</p>`;
                validarTieneActividad(index)
                return true;
            };
        };
    }else{
        return false;
    };
};

export{validarFormularioIniciarSesion, validarTieneActividad};