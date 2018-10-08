import {Request} from "express-serve-static-core";
import * as SocketIO from "socket.io";

export interface CustomRequest extends Request{
    io: SocketIO,
}