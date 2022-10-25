import { editarClaseMostrar } from "./habilitarMostrarBoton.js";
import { obtenerClientes } from "./storage.js";
import { guardarListaClientesStorage } from "./storage.js";

let radioSelected = '';
let listaHorario = [];
let listaDisciplina = obtenerClientes();
let contador = 0;
let disciplina = '';
let packSeleccionado = 0;
let verCarrito = document.getElementById('carrito');


document.getElementById('anotarme').addEventListener('click', () => {
    document.getElementById('cantidadClases').innerHTML = ' '
    const acordeon = document.getElementById('accordionPanelsStayOpenExample');
    acordeon.hidden = true;

    document.getElementById('setear').addEventListener('click', function() {
        setRadio('status');
        acordeon.hidden = false;
        listaHorario = [];
        listaDisciplina = [];
        contador = 0;
    });

    document.getElementById('botonAceptarHorario').addEventListener('click', function() {
        setCheck('statusCheck');
        acordeon.hidden = true;
        uncheckAll();
    });

});

function setRadio(name) {
    let radioButtons = document.querySelectorAll(`input[name = "${name}"]`);
        for (const radioButton of radioButtons) {
            if (radioButton.checked) {
                radioSelected = radioButton.value;
                document.getElementById('cantidadClases').innerHTML=`Puedes elegir ${radioSelected} clase/s`
            }
        };
    radioPack(radioSelected);
};

const radioPack = (radioSelected)=>{
    switch(radioSelected){
        case '1':
            return radioSelected;
        case '2':
            return radioSelected;
        case '3':
            return radioSelected;
        case '4':
            return radioSelected;
    };
};

const uncheckAll = () => {
    let checkElement = document.querySelectorAll(`input[name = "statusCheck"]`);
    checkElement.forEach((checkbox) => {
        checkbox.checked = false;
    });

    let checkElementRadio = document.querySelectorAll(`input[name = "status"]`);
    checkElementRadio.forEach((radiobox)=>{
        radiobox.checked = false;
    });
};

// Valida que no puedas elegir el mismo horario de actividades diferentes.
const agregarLista = (horario, disciplina)=>{
    if (!listaHorario.includes(horario)) {
        listaHorario.push(horario);
        listaDisciplina.push([disciplina, " " + horario]);
    }else if (radioSelected != 1){
        setTimeout(() => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ya has elegido una disciplina en este horario.',
                timer: 1000
            })
        }, 2000);

    }else if (radioSelected == 1) {
        listaHorario.push(horario);
    };
};

const validarHorarios = (contador) =>{

    if ((radioSelected == 1) && !(listaHorario.length == 1)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tenés que elegir un horario.',
            timer: 2000
        });
        listaHorario = [];
        contador = 0;
        return false;

    } else if(((radioSelected == 2) && !(listaHorario.length == 2)) || (radioSelected == 2) && (contador != 2)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tenés que elegir dos horarios.',
            timer: 2000
        });
        listaHorario = [];
        contador = 0;
        return false;
    } else if((radioSelected == 3) && !(listaHorario.length == 3) || (radioSelected == 3) && (contador !=3 )) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tenés que elegir tres horarios.',
            timer: 2000
        });
        listaHorario = [];
        contador = 0;
        return false;
    } else if((radioSelected == 4) && !(listaHorario.length == 4) || (radioSelected == 4) && (contador != 4)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Tenés que elegir cuatro horarios.',
            timer: 2000
        });
        listaHorario = [];
        listaDisciplina = [];
        contador = 0;
        return false;
    } else {
        return true;
    }
}

// Operador ++
function setCheck(horario) {
    let checkButtons = document.querySelectorAll(`input[name = "${horario}"]:checked`);

    checkButtons.forEach((checkbox) => {
        if((checkbox.id == 'primerHorarioTela') || (checkbox.id == 'segundoHorarioTela') || (checkbox.id == 'tercerHorarioTela') || (checkbox.id == 'cuartoHorarioTela')){
            disciplina = 'Tela';
        }else if((checkbox.id == 'primerHorarioTrape') || (checkbox.id == 'segundoHorarioTrape') || (checkbox.id == 'tercerHorarioTrape') || (checkbox.id == 'cuartoHorarioTrape')){
            disciplina = 'Trapecio';
        }else if((checkbox.id == 'primerHorarioAro') || (checkbox.id == 'segundoHorarioAro') || (checkbox.id == 'tercerHorarioAro') || (checkbox.id == 'cuartoHorarioAro')){
            disciplina = 'Aro';
        }else if((checkbox.id == 'primerHorarioFlexi') || (checkbox.id == 'segundoHorarioFlexi') || (checkbox.id == 'tercerHorarioFlexi') || (checkbox.id == 'cuartoHorarioFlexi')){
            disciplina = 'Flexibilidad';
        }
        agregarLista(checkbox.value, disciplina);
        contador ++;
    });

    let prueba = validarHorarios(contador);
    if (prueba === true) {
        if (radioSelected == 1){
            packSeleccionado = 4200;
        }else if (radioSelected == 2){
            packSeleccionado = 6600;
        }else if (radioSelected == 3){
            packSeleccionado = 8900;
        }else if(radioSelected == 4){
            packSeleccionado = 9300;
        }else{
            packSeleccionado = 0;
        }

        verCarrito.innerHTML = `<p>${packSeleccionado}$</p>`;

        reescribirCliente();
        document.getElementById('accordionPanelsStayOpenExample').hidden=true;

    }
}

// Modifica en el storage si el usuario edita las actividades
const reescribirCliente = () => {
    let bienvenida = document.getElementById('bienvenida');
    let bienvenidaUsuario = bienvenida.innerText;

    let almacenadas = obtenerClientes();
    let nuevaListaClientes = [];

    for (let index = 0; index < almacenadas.length; index ++) {
        nuevaListaClientes.push(almacenadas[index]);
        if((almacenadas[index].usuario) === bienvenidaUsuario){

            localStorage.removeItem('listaClientes');
            nuevaListaClientes.splice(index, 1);

            const cliente ={
                nombre: almacenadas[index].nombre,
                apellido: almacenadas[index].apellido,
                dni: almacenadas[index].dni,
                usuario: almacenadas[index].usuario,
                email: almacenadas[index].email,
                confEmail: almacenadas[index].confEmail,
                contrasenia: almacenadas[index].contrasenia,
                confContrasenia: almacenadas[index].confContrasenia,
                actividad: listaDisciplina,
                precio: packSeleccionado
            };

            nuevaListaClientes.push(cliente);

            Swal.fire({
                icon: 'success',
                title: 'Mis clases:',
                text: `${listaDisciplina.join('; ')}`,
            });
            guardarListaClientesStorage(nuevaListaClientes);
        }
    }
    editarClaseMostrar();

    guardarListaClientesStorage(nuevaListaClientes);

}
export{validarHorarios};