import { Producto } from "../productos/producto";
import { Orden } from "./orden";

export class DetalleOrden{
id?: number;
cantidad?: number;
producto?: Producto;
orde?: Orden;


}
