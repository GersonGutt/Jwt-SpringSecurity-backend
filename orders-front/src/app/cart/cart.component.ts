import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../productos/producto.service';
import { OrdenService } from '../ordenes/orden.service';
import { ConfirmationService, MessageService, PrimeNGConfig, TranslationKeys } from 'primeng/api';
import { Producto } from '../productos/producto';
import { Usuario } from '../usuarios/usuario';
import { Orden } from '../ordenes/orden';
import { DetalleOrden } from '../ordenes/detalleorden';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class CartComponent implements OnInit{

  layout: string = 'list';
  products!: Producto[];

    usuario: Usuario = {id:1,"nombre":"Gerson", "telefono":"2121-2828","correo":"gersongutt@gmail.com"};
    orden: Orden = new Orden();
    detalle: DetalleOrden[] = [];
    detalleOrdenDialog: boolean = false;
    title: string;
    submitted: boolean = false;
    validar: boolean = false;

    constructor(private productoService: ProductoService,
      private ordenService: OrdenService,
      private messageService:MessageService,
      private confirmationService:ConfirmationService,
      private primengConfig: PrimeNGConfig){}


  ngOnInit():void{
    this.getProductActivos();
    this.orden.usuario = this.usuario;
    this.orden.fechaOrden = new Date();
  }

  getProductActivos():void{
  this.productoService.getAllActivos().subscribe(
   response =>{
  this.products = response as Producto[];
  console.log(response);
  }
    )
  };
  addToOrder(producto: Producto, cantidad: number, $event:MouseEvent){
  //  ($event.target as HTMLButtonElement).disabled =true;
  if (isNaN(cantidad)){
    cantidad = 1;
  }
  if(this.orden.detalleOrden != null){
    this.orden.detalleOrden.forEach(detalle => {
      if (producto.id == detalle.producto.id){
        this.validar = true;
      }

  });

}
 console.log(this.validar);
   if (this.validar == true){
    console.log("entre");

      this.restarCantidad(producto, cantidad);

        if (this.orden.detalleOrden != null){
          this.orden.detalleOrden.forEach(detalle => {
            if (producto.id == detalle.producto.id){
              detalle.cantidad = detalle.cantidad + cantidad;
            }});
            this.messageService.add({severity: 'success', summary: 'Resultado', detail: 'Producto actualizado en la Orden', life: 2000});
        }
        this.validar = false
      }
    else{
     this.restarCantidad(producto, cantidad);
     this.agregarDetalle(producto, cantidad);
    }
  }

  restarCantidad(producto: Producto, cantidad: number):void{
    this.products.forEach(products => {
      if(products.id == producto.id){
        products.existencia = products.existencia - cantidad;
      }
    });
  }

  agregarDetalle(producto: Producto, cantidad: number):void{
    this.detalle.push({
      cantidad: cantidad,
      producto: producto
      }as DetalleOrden);
      this.orden.detalleOrden = this.detalle;
      this.messageService.add({severity: 'success', summary: 'Resultado', detail: 'Producto agregado a la orden', life: 2000});
      console.log(this.orden);
  }

  calcTotal(): number{
    let totalOrden: number = 0;
    if(this.orden.detalleOrden.length> 0){
      this.detalle.forEach(element =>{
        totalOrden += (element.cantidad * element.producto.precio);
      })
    }
    return totalOrden;
  }

  quitarItem(item):void{
    let index = this.orden.detalleOrden.indexOf(item);
    this.orden.detalleOrden.splice(index,1);
    this.orden.monto = this.calcTotal();
  }

  hideDialog():void{
    this.detalleOrdenDialog = false;
    this.submitted = false;
  }

  verDetalleOrden(){
    this.detalleOrdenDialog = true;
    this.title ="Detalle de la Orden";
    this.orden.monto = this.calcTotal();
  }

  saveOrden(): void{
    this.submitted = true;
    this.confirmationService.confirm({
      message: 'Seguro/a de confirmar la Orden?',
      header: 'Confirm',
      icon: 'pi pi-question-circle',
      accept: () => {
        this.orden.estado = 'R';
          this.ordenService.createOrder(this.orden).subscribe({
            next: (response) => {
              console.log(response.message);
              this.messageService.add({ severity: 'success', summary: 'Resultado', detail: `${response.message}`, life: 3000 });
          },
          error: (err) =>{
            this.messageService.add({ severity: 'error', summary: 'Resultado', detail: `${err.message}`, life: 3000 });
          }
        }
        );
        //seteo de detalle orden
        this.detalleOrdenDialog = false;
        this.detalle = [];
        this.orden.detalleOrden = [];
      }
  });
  }
  getEventValue($event:any):string{
    return $event.target.value;
    }


}
