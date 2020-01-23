// Comando para establecer la conexion
let socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', () => {

    console.log('Conectado al Servidor');

})

socket.on('disconnect', () => {

    console.log('Desconectado al Servidor');

})

// on 'estadoActual'
socket.on( 'estadoActual', (data) => {

    label.text(data.estado);
});

// JQuery
// Al hacer click en los button se ejecuta la funcion
$('button').on('click', function(){
    
    socket.emit('siguienteTicket',(resp) => {

        label.text(resp);
    
    });


})

