"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const db_1 = __importDefault(require("../database/db"));
const db_mysql_1 = __importDefault(require("../database/db_mysql"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const producto_route_1 = __importDefault(require("../routers/producto_route"));
const stock_route_1 = __importDefault(require("../routers/stock_route"));
const inventario_route_1 = __importDefault(require("../routers/inventario_route"));
const ventas_route_1 = __importDefault(require("../routers/ventas_route"));
const producto_mysql_route_1 = __importDefault(require("../routers/producto_mysql-route"));
class Server {
    constructor() {
        this.apiPatch = {
            producto: '/api/producto',
            stock: '/api/stock',
            inventario: '/api/inventario',
            ventas: '/api/ventas',
            productoMsql: '/api/mysql/producto',
        };
        this.app = (0, express_1.default)();
        this.app.use(express_1.default.json({ limit: '100mb' }));
        this.app.use((0, express_fileupload_1.default)({
            abortOnLimit: false,
            createParentPath: false,
            debug: false,
            limitHandler: false,
            parseNested: false,
            preserveExtension: false,
            responseOnLimit: 'proper messsage',
            safeFileNames: false,
            tempFileDir: '../temp',
            uploadTimeout: 30 * 1000,
            uriDecodeFileNames: false,
            useTempFiles: true,
        }));
        this.port = process.env.PORT || '80';
        this.httpServer = http_1.default.createServer(this.app);
        this.io = new socket_io_1.default.Server(this.httpServer, { cors: { origin: '*' } });
        this.dbConnection();
        this.middlewares();
        this.routes();
        // this.escucharSockets();
    }
    static get instance() {
        return this._intance || (this._intance = new this());
    }
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield (0, db_1.default)();
                console.log('Database online');
            }
            catch (error) {
                //throw new Error( error);
                console.log('error base de datos');
            }
        });
    }
    dbMySqlConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield db_mysql_1.default.authenticate();
                console.log('Database online');
            }
            catch (error) {
                console.log('error base de datos');
            }
        });
    }
    middlewares() {
        // CORS
        this.app.use((0, cors_1.default)());
        // Lectura del body
        this.app.use(express_1.default.json());
        // Carpeta pública
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPatch.producto, producto_route_1.default);
        this.app.use(this.apiPatch.stock, stock_route_1.default);
        this.app.use(this.apiPatch.inventario, inventario_route_1.default);
        this.app.use(this.apiPatch.ventas, ventas_route_1.default);
        this.app.use(this.apiPatch.productoMsql, producto_mysql_route_1.default);
        this.app.get('*', (req, res) => {
            res.sendFile('index.html', { root: 'public' });
        });
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo puerto: ' + this.port);
        });
    }
    escucharSockets() {
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
    start(callback) {
        this.httpServer.listen(this.port, callback);
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map