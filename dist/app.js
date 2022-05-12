"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./server/server"));
dotenv_1.default.config();
const server = server_1.default.instance;
server.start(() => {
    console.log(`Servidor corriendo en el puerto ${server.port}`);
});
//# sourceMappingURL=app.js.map