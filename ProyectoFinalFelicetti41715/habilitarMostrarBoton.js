const iniciarSesionMostrar = () => {
    document.getElementById('botonIniciar').disabled = true;
    document.getElementById('botonCerrar').disabled = false;
    document.getElementById('pruebaCarrito').hidden = false;
};

// Habilitar botón elegir clases
const elegirClaseMostrar=()=> {
    document.getElementById('anotarme').disabled = false;
    document.getElementById('anotarme').innerText = `Elegir clases`;
    document.getElementById('anotarme').hidden = false;
};

// Habilitar botón editar clase, habilitar botón ver horario elegido.
const editarClaseMostrar = () => {
    document.getElementById('anotarme').disabled = false;
    document.getElementById('anotarme').hidden = false;
    document.getElementById('anotarme').innerText = `Editar clases`;
    document.getElementById('verMiHorario').disabled = false;
    document.getElementById('verMiHorario').hidden = false;
};

// Cerrar sesión
let botonCerrar = document.getElementById('botonCerrar');
botonCerrar.onclick=()=>{
    Swal.fire({
        title: 'Estás seguro/a?',
        text: "Deseo cerrar sesión",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si',
        cancelButtonText: 'No'
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById('botonIniciar').disabled = false;
            document.getElementById('botonCerrar').disabled = true;
            document.getElementById('pruebaCarrito').hidden = true;
            document.getElementById('anotarme').hidden = true;
            document.getElementById('anotarme').disabled = true;
            document.getElementById('verMiHorario').disabled = true;
            document.getElementById('verMiHorario').hidden = true;
            localStorage.removeItem('listaUsuarios');
            Swal.fire(`Adiós ${bienvenida.innerText}`);
            bienvenida.innerHTML = ` `;
            document.getElementById('user_name').value = '';
            document.getElementById('user_apellido').value = '';
            document.getElementById('user_email').value = '';
        };
      });

};

export{iniciarSesionMostrar, elegirClaseMostrar, editarClaseMostrar};