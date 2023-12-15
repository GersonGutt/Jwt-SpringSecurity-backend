import { Usuario } from "../usuarios/usuario";
import { DetalleOrden } from "./detalleorden";

export  class Orden{
    id?: number;
    correlativo?: string;
    fechaOrden?:  Date;
    fechaDespacho?: Date;
    monto?: number;
    impuesto?: number;
    totalEnvio?: Date;
    estado?: string;
    usuario?: Usuario;
    detalleOrden?: DetalleOrden[];
    
    }