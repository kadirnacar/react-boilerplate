import * as http from 'http';
import App from './server';


const port = process.env.PORT || 3005;
App.set('port', port);

const server = http.createServer(App);
server.listen(port);
declare const module: any;
if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => {
        server.close();
    });
}



const onError = (error) => {
    console.log(error);
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof port === 'string') ? 'Pipe ' + port : 'Port ' + port;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const onListening = () => {
    let addr = server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Listening on ${bind}`);
}

server.on('error', onError);
server.on('listening', onListening);

