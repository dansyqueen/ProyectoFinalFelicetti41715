import { obtenerClientes } from "./storage.js";
import { guardarListaClientesStorage } from "./storage.js";
import { guardarListaUsariosStorage } from "./storage.js";
import { obtenerUsuariosStorage } from "./storage.js";
import { elegirClaseMostrar } from "./habilitarMostrarBoton.js";
import { iniciarSesionMostrar } from "./habilitarMostrarBoton.js";
import { validarContraseniaIgual } from "./validar.js";
import { validarEmailIgual } from "./validar.js";
import { llenarFormularioContacto } from "./contacto.js";
import { validarFormularioIniciarSesion } from "./iniciarSesion.js";
import { validarHorarios } from "./elegirClase.js";
import { validarTieneActividad } from "./iniciarSesion.js";

let listaDisciplina = [];
let listaClientes = [];
let listaUsuarios = [];
let packSeleccionado = 0;
let usuarioIngresadoOk = '';

const forms = document.getElementById('form');

const validarFormulario = (e) => {
    e.preventDefault();

    const formulario = new FormData(forms);

    const cliente ={
        nombre: formulario.get('nombreForm'),
        apellido: formulario.get('apellidoForm'),
        dni: formulario.get('DNIForm'),
        usuario: formulario.get('usuarioForm').toLowerCase(),
        email: formulario.get('emailForm'),
        confEmail: formulario.get('confEmailForm'),
        contrasenia: formulario.get('contraseniaForm'),
        confContrasenia: formulario.get('confContraseniaForm'),
        actividad: listaDisciplina,
        precio: packSeleccionado
    };

    validarUsuarioExito(cliente);
};


validarContraseniaIgual();
validarEmailIgual();

// Crear usuario form
// Cliente creado con éxito
let bienvenida = document.getElementById('bienvenida');
const validarUsuarioExito = (cliente) => {

    //Desestructuración
    const {nombre, apellido, usuario} = cliente;

    let validarUsuario =  verificarUsuario(usuario);

    if (validarUsuario == false) {
        listaClientes.push(cliente);
        guardarListaClientesStorage(listaClientes);
        guardarListaUsariosStorage(usuario)

        document.getElementById('pruebaCarrito').hidden = false;

        Swal.fire({
            icon: 'success',
            title: `Bienvenido/a ${nombre} ${apellido}`,
            text: `El usuario ${usuario} se ha creado con éxito!`
          })

        bienvenida.innerText = `${usuario}`;

        llenarFormularioContacto();
        iniciarSesionMostrar();
        elegirClaseMostrar();

        forms.reset();
        document.getElementById('validarContrasenia').hidden = true;
        document.getElementById('validarEmail').hidden = true;
        verCarrito.innerHTML = `<p>0$</p>`;
        botonVerMiHorario.hidden = true;
    }
}

forms.addEventListener('submit', validarFormulario);

// Crear usuario Form
// Uso Operador lógico OR para ser si ya existe el usuario
const verificarUsuario = (usuario) => {
    const verUsuarioExiste = recorrerListaClientes(usuario) || false;
    return verUsuarioExiste;
};

// Crear usuario Form
// Verifico si el usuario existe
const recorrerListaClientes = (usuario) => {
    if (listaClientes != null) {
        for (let index = 0; index < listaClientes.length; index ++) {
            if((listaClientes[index].usuario) === usuario){
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `El usuario ${usuario} ya existe, por favor ingrese otro`,
                    timer: 3000
                    })
                let eliminarTextoUsuario = document.getElementById('usuarioForm');
                eliminarTextoUsuario.value = '';
                eliminarTextoUsuario.focus();
                return true;
            }
        }
    }else{
        return false;
    }
}

document.getElementById('iniciar').addEventListener('submit', validarFormularioIniciarSesion);


// toastify
// Cuando actualiza la página, muestra un toastify con el nombre del usuario
let verCarrito = document.getElementById('carrito');
const obtenerUsuarios = () => {
    const todosUsuarios = obtenerUsuariosStorage();
    Toastify({
        text: `Sesión de ${todosUsuarios}`,
        duration: 3000,
        position: 'left'
    }).showToast();

    iniciarSesionMostrar();

    let bienvenidaActualizar = document.getElementById('bienvenida');
    bienvenidaActualizar.innerText = `${todosUsuarios}`;

    for (let index = 0; index < listaClientes.length; index ++) {
        if((listaClientes[index].usuario) === todosUsuarios){
            validarTieneActividad(index);
            llenarFormularioContacto();

            verCarrito.innerHTML = `<p>${listaClientes[index].precio}$</p>`;

            return true;
        };
    };
}

const botonVerMiHorario = document.getElementById('verMiHorario');
botonVerMiHorario.onclick = () => {
    const todosUsuarios = obtenerUsuariosStorage();
    listaClientes = obtenerClientes();

    for (let index = 0; index < listaClientes.length; index ++) {
        if((listaClientes[index].usuario) === todosUsuarios){
            usuarioIngresadoOk = listaClientes[index].usuario;
            Swal.fire({
                title: 'Mis clases:',
                text: `${listaClientes[index].actividad.join('; ')}`
            });
        };
    };

}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('listaClientes')) {
        listaClientes = obtenerClientes();
    };

    if(localStorage.getItem('listaUsuarios')){
        listaUsuarios = obtenerUsuarios();
    };
});

//Fetch
const botonHorario = document.getElementById('botonHorario');
botonHorario.onclick = () => {
    let horarios = document.getElementById('mostrarHorario');

    fetch('/actividad.json')
    .then((response) => response.json())
    .then((data) => {
        data.forEach((actividad) => {
            const li = document.createElement('p');
            li.innerHTML = `
                <h6><strong><ins>${actividad.disciplina}</ins></strong></h6>
                <p>${actividad.horario1}</p>
                <p>${actividad.horario2}</p>
                <p>${actividad.horario3}</p>
                <p>${actividad.horario4}</p>
                <br>
            `
            horarios.appendChild(li);
        })
    })
};

let botonAceptarHorario = document.getElementById('botonAceptarHorario');
botonAceptarHorario.addEventListener('click', validarHorarios);