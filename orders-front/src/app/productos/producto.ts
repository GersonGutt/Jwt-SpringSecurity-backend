import { Categoria } from "../categorias/categoria";
import { Marca } from "../marcas/marca";

export class Producto{
    id?:number;
    nombre?:string;
    descripcion?:string;
    precio?:number;
    existencia?:number;
    modelo?:string;
    imagen?:string;
    estado?:string;
    categoria?: Categoria;
    marca?: Marca;
}
