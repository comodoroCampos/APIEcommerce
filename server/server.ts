import express, { Application, Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import db from '../database/db';
import cors from 'cors';
import path from 'path';
import socketIO from 'socket.io';
import http from 'http';
import apuntesRoute from '../routers/producto_route';
import stockRoute from '../routers/stock_route';
import inventarioRoute from '../routers/inventario_route';
import ventasRoute from '../routers/vantas_route';

export default class Server {
    private static _intance: Server;
    public app: Application;
    public port: string;

    public io: socketIO.Server;
    private httpServer: http.Server;


    private apiPatch = {
        producto: '/api/producto',
        stock: '/api/stock',
        inventario: '/api/inventario',
        ventas: '/api/ventas',
       
    };

    private constructor() {
        this.app = express();
        this.app.use(express.json({limit: '100mb'}));
        this.app.use(
            fileUpload({
                abortOnLimit: false,
                createParentPath: false,
                debug: false,
                limitHandler: false,
                parseNested: false,
                preserveExtension: false,
                responseOnLimit: 'proper messsage',
                safeFileNames: false,
                tempFileDir: '../temp',
                uploadTimeout: 30 * 1_000,
                uriDecodeFileNames: false,
                useTempFiles: true,
            }),
        );
        this.port = process.env.PORT || '80';
        this.httpServer = http.createServer(this.app);
        this.io = new socketIO.Server(this.httpServer, { cors: { origin: '*' } });

        this.dbConnection();
        this.middlewares();
        this.routes();
       // this.escucharSockets();
    }
    public static get instance() {
        return this._intance || (this._intance = new this());
    }
    async dbConnection() {

        try {

            await db();
            console.log('Database online');

        } catch (error) {
            //throw new Error( error);
            console.log('error base de datos');
        }

    }
    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json());

        // Carpeta pública
        this.app.use(express.static('public'));


    }

    routes() {
     
        this.app.use(this.apiPatch.producto, apuntesRoute);
        this.app.use(this.apiPatch.stock, stockRoute);
        this.app.use(this.apiPatch.inventario, inventarioRoute);
        this.app.use(this.apiPatch.ventas, ventasRoute);
        this.app.get('*', (req: Request, res: Response) => {
            res.sendFile(path.resolve(__dirname, 'public/index.html'));
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo puerto: ' + this.port);
        });
    }
    private escucharSockets() {

        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente => {

            console.log('Cliente conectado');

            // // Mensajes
            // socket.mensaje(cliente, this.io);
            // socket.configurarMonitor(cliente, this.io)
            // socket.desconectarMonitor(cliente, this.io);
            // socket.conectarMonitor(cliente, this.io);
            // socket.obtenerMonitores(cliente, this.io);
            // // Desconectar
            // socket.desconectar(cliente);

        });

    }
    start(callback: VoidFunction) {

        this.httpServer.listen(this.port, callback);

    }
}