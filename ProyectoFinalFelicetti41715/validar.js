const email = document.getElementById('emailForm');
const confEmail = document.getElementById('confEmailForm')
const contrasenia = document.getElementById('contraseniaForm');
const confContrasenia = document.getElementById('confContraseniaForm');

const validarEmailIgual = () => {

    const validarEmail = document.getElementById('validarEmail');

    confEmail.addEventListener('keyup', logKey);
    email.addEventListener('keyup', logKey);

    function logKey() {
        validarEmail.hidden = false;

        if (email.value === confEmail.value){
            validarEmail.innerHTML = `<div class="alert alert-success" role="alert">Los emails coinciden.</div>`;
            if (contrasenia.value === confContrasenia.value){
                document.getElementById('boton').disabled = false;
            }
        }else{
            validarEmail.innerHTML = `<div class="alert alert-danger" role="alert">Los emails no coinciden.</div>`
            document.getElementById('boton').disabled = true;
        };
    };
};

const validarContraseniaIgual = () => {

    const validarContrasenia = document.getElementById('validarContrasenia');

    contrasenia.addEventListener('keyup', logKey);
    confContrasenia.addEventListener('keyup', logKey);

    function logKey() {
        validarContrasenia.hidden = false;

        if (contrasenia.value === confContrasenia.value){
            validarContrasenia.innerHTML = `<div class="alert alert-success" role="alert">Las contraseñas coinciden.</div>`
            if (email.value === confEmail.value){
                document.getElementById('boton').disabled = false;
            }

        }else{
            validarContrasenia.innerHTML = `<div class="alert alert-danger" role="alert">Las contraseñas no coinciden.</div>`
            document.getElementById('boton').disabled = true;
        };
    };
};



export{validarContraseniaIgual, validarEmailIgual}