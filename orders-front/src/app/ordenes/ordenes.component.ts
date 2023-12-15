import { Component, OnInit } from '@angular/core';
import { OrdenService } from './orden.service';
import { Orden } from './orden';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit{

  ordenes : Orden[];
  orden!: Orden;

  title: string;
  estado : string;

  submitted: boolean = false;

  statuses!: any[];
  indexSelect : number = -1;
  checked: boolean = false;
  optionRadioButton:string =  'Recibidas';
  ingredient!: string;

  detalleOrdenDialog: boolean = false;

  constructor(private ordenService: OrdenService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService){}

  ngOnInit(): void {
    this.getAllRecibidas();

  }
  getAllRecibidas (): void{
  this.ordenService.getAllRecibidas().subscribe({
    next: (json) => {
      console.log(json);
      this.ordenes = json as Orden[];
    },
    error: (err) => {
      this.messageService.add({severity: 'error',
      summary: 'Resultado', detail: `${err.error.error}`, life: 3000});
      console.log(err.error.message);
    }

    }
    )
  }
  getAllDespachadas (): void{
    this.ordenService.getAllDespachadas().subscribe({
      next: (json) => {
        this.ordenes = json as Orden[];
      },
      error: (err) => {
        this.messageService.add({severity: 'error',
        summary: 'Resultado', detail: `${err.error.error}`, life: 3000});
        console.log(err.message);
      }

      }
      )
    }
    getAllAnuladas (): void{
      this.ordenService.getAllAnuladas().subscribe({
        next: (json) => {
          this.ordenes = json as Orden[];
        },
        error: (err) => {
          this.messageService.add({severity: 'error',
          summary: 'Resultado', detail: `${err.error.error}`, life: 3000});
          console.log(err.message);
        }

        }
        )
      }
      //metodo para cambiar el estado de la orden
  changeState(estado: string,orden: Orden) {
  let estadoText = estado == 'D' ? 'Despachar': 'Anular';
  this.confirmationService.confirm({
      message: `Seguro/a de cambiar a ${estadoText} la orden?`,
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.ordenService.changeState(orden, estado).subscribe({
            next: (response) => {
              this.ordenes = this.ordenes.filter((val) => val.id !== orden.id);
              this.orden = null;
              this.messageService.add({ severity: 'success', summary: 'Resultado', detail: `${response.message}`, life: 3000 });
          },
          error: (err) =>{
            this.messageService.add({ severity: 'error', summary: 'Resultado', detail: `${err.message}`, life: 3000 });
            console.log('status code: ' + err.status);
            console.log(err.message);
          }
        }
        );
      }
  });
}

verDetalle(orden: Orden){
  console.log(orden);
  this.orden = {... orden};
  this.detalleOrdenDialog = true;
  this.title = "Detalle de la Orden";

}
hideDialog():void{
  this.detalleOrdenDialog = false;
  this.submitted = false;
  }

getEventValue($event:any):string{
  return $event.target.value;
  }

}

