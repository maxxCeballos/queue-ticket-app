const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', ( callback ) => {

        

        let ultimoTicket = ticketControl.siguiente();


        callback(ultimoTicket);
    });


    client.emit( 'estadoActual', {

        estado: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });


    client.on('atenderTicket', (data, callback) => {

        if ( !data.escritorio ) {
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            })
        }

        let atenderTicket = ticketControl.atenderTicket( data.escritorio );

        callback( atenderTicket );

        client.broadcast.emit('ultimos4', {

            estado: ticketControl.getUltimoTicket(),
            ultimos4: ticketControl.getUltimos4()
        });        

    })
    

});