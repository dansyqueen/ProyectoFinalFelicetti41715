import { obtenerClientes } from "./storage.js";

const llenarFormularioContacto = () => {
    let nombreUsuarioContacto = document.getElementById('bienvenida');
    let listaClientes = obtenerClientes();
    for (let index = 0; index < listaClientes.length; index ++) {

        if(((listaClientes[index].usuario) === nombreUsuarioContacto.innerText)){
            document.getElementById('user_name').value = `${listaClientes[index].nombre}`;
            document.getElementById('user_apellido').value = `${listaClientes[index].apellido}`;
            document.getElementById('user_email').value = `${listaClientes[index].email}`;
        };
    };
}

(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init('AGcY6yuGfweiw5bVn');
})();

window.onload = function() {
    document.getElementById('contact-form').addEventListener('submit', function(event) {
        event.preventDefault();

        // generate a five digit number for the contact_number variable
        this.contact_number.value = Math.random() * 100000 | 0;
        // these IDs from the previous steps
        emailjs.sendForm('contact_service', 'contact_form', this)
            .then(function() {
                Toastify({
                    text: `El mensaje ha sido enviado con éxito`,
                    duration: 3000,
                    position: 'center'
                }).showToast();
            }, function(error) {
                console.log('FAILED...', error);
                Toastify({
                    text: `Error al enviar el mensaje`,
                    duration: 3000,
                    position: 'center'
                }).showToast();
            });
            document.getElementById('contact-form').reset();
    });
}

export{llenarFormularioContacto};