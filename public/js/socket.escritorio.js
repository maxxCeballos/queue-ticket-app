var socket = io();

var searchParams = new URLSearchParams( window.location.search );

let label = $('small');

if( !searchParams.has('escritorio') ) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');

$('h1').text('Escritorio ' + escritorio);


$('button').on('click', function() {
    socket.emit('atenderTicket', { escritorio: escritorio }, ( ticket ) => {

        if ( !ticket.numero ) {
            label.text('No hay mas numeros');
        }
        
        label.text(ticket.numero);
    
    });
});
