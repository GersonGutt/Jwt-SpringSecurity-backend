import { Component } from '@angular/core';
import { Producto } from './producto';
import { ProductoService } from './producto.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Categoria } from '../categorias/categoria';
import { CategoriaService } from '../categorias/categoria.service';
import { Marca } from '../marcas/marca';
import { MarcaService } from '../marcas/marca.service';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles:[
  `:host :: ng-deep .p-dialog .product-image{
    width: 150px;
    margin: 0 auto 2rem auto;
    display: block;
  }
  `
  ],
  styleUrls: ['./productos.component.css'],
  providers:[ MessageService, ConfirmationService]
})
export class ProductosComponent {

  productDialog: boolean = false;

  productos!: Producto[];
  producto!: Producto;

  categorias!: Categoria[];
  marcas!: Marca[];

  //selectedProducto!: Producto[] | null;
  submitted: boolean = false;

    statuses!: any[];
    title: string = "";
    indexSelected : number = -1;

    private imagen: File
    estado: string;
    checked: boolean = false;

    constructor(private productoService: ProductoService, private categoriaService: CategoriaService, private marcaService: MarcaService, private messageService: MessageService, private confirmationService: ConfirmationService) {}


  ngOnInit(): void{
  this.getActivos();
  this.getCategorias();
  this.getMarcas();
}

getActivos(): void{
this.productoService.getAllActivos().subscribe(
  response =>{
  this.productos = response as Producto[];
  //console.log(response);
    }
  );
}

getInactivos(): void{
  this.productoService.getAllInactivos().subscribe(
    response =>{
    this.productos = response as Producto[];
    //console.log(response);
      }
    );
  }

openNew() {
  this.producto = {};
  this.submitted = false;
  this.productDialog = true;
  this.title = "Agregar Producto"
}

editProduct(producto: Producto) {
  this.producto = { ...producto};
  this.productDialog = true;
  this.title = "Actualizar Producto"
  this.indexSelected = this.productos.indexOf(producto);
}
getMarcas(): void {
  this.marcaService.getAll().subscribe(
    response => {
    this.marcas = response as Marca[];
    }
    )

  }
  getCategorias(): void {
    this.categoriaService.getAll().subscribe(
      response => {
      this.categorias = response as Categoria[];
      }
      )

    }


hideDialog() {
  this.productDialog = false;
  this.submitted = false;
}

createFormData(): FormData{
  let formData = new FormData();
  if(this.imagen == null){
    if(this.producto.id = null){
    this.producto.imagen = null;
    formData.append("imagen", null);
    }
  }else{
  formData.append("imagen", this.imagen);
  }
  formData.append("producto", new Blob([JSON.stringify(this.producto)], {type:"application/json"}))
  return formData;
  }

//metodo para guardar una categoria
create ():void{
  this.submitted = true;
  console.log(this.createFormData() as Producto);
  this.productoService.create(this.createFormData() as Producto).subscribe({
  next: (json) => {
  this.productos.unshift(json.data);
  console.log(json);
  this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
  },
  error: (err) => {
    if (err.status == 409){
      this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error.message}`, life: 3000});

    }
  this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error}`, life: 3000});
  console.log(err.error);
  console.log('code status: '+err.status);
  console.log(err.message);
  }
  });
  this.productDialog = false;
  this.producto = {}
  this.imagen = null;
  }

update():void {
  this.submitted = true;
  let id = this.producto.id;
  this.productoService.update(this.createFormData() as Producto, id).subscribe({

  next: (json) =>{
    Object.assign(this.productos[this.indexSelected],json.producto);

  this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
  },
  error: (err) => {
    this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error}`, life: 3000});
    console.log('code status: '+err.status);
    console.log(err);
  }
})
this.productDialog = false;
this.producto = {};
this.imagen = null;
}

//metodo para cambiar el estado de un producto
deleteProduct(estado: string, product: Producto):void {
  console.log(product);
  this.confirmationService.confirm({
      message: 'Esta seguro/a de desactivar el producto ' + product.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.productoService.changeState(estado,product).subscribe({
            next: (response) => {
              this.productos = this.productos.filter((val) => val.id !== product.id);
              this.producto = {};
              this.messageService.add({ severity: 'success', summary: 'Resultado', detail: `${response.message}`, life: 3000 });
          },
          error: (err) =>{
            this.messageService.add({ severity: 'error', summary: 'Resultado', detail: `${err.message}`, life: 3000 });
            console.log(err);
          }
        }
        );
      }
  });
}

seleccionarImagen(event){
this.imagen = event.target.files[0];
console.log(this.imagen);
}

getEventValue($event:any):string{
return $event.target.value;
}

checkChanged(event){
if(event)
  this.getInactivos();
else
this.getActivos();

}

}
