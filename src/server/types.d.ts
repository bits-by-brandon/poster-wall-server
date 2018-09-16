import {Request} from "express-serve-static-core";
import * as SocketIO from "socket.io";

export interface SocketRequest extends Request{
    io: SocketIO
}