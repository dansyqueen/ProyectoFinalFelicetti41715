const guardarListaClientesStorage = (listaClientes) => {
    localStorage.setItem('listaClientes', JSON.stringify(listaClientes));
};

const guardarListaUsariosStorage = (listaUsuarios) => {
    localStorage.setItem('listaUsuarios', JSON.stringify(listaUsuarios).toLowerCase());
};

const obtenerClientes = () => {
    let listaClientes = [];
    const todosClientes = JSON.parse(localStorage.getItem('listaClientes'));
    listaClientes.push(todosClientes);
    return todosClientes;
};

const obtenerUsuariosStorage = () => {
    let listaUsuarios = [];
    const todosUsuarios = JSON.parse(localStorage.getItem('listaUsuarios'));
    listaUsuarios.push(todosUsuarios);
    return todosUsuarios;
};


export {guardarListaClientesStorage, guardarListaUsariosStorage, obtenerClientes, obtenerUsuariosStorage};