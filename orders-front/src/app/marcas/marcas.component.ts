import { Component } from '@angular/core';
import { Marca } from './marca';
import {MarcaService} from './marca.service'
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styleUrls: ['./marcas.component.css'],
  providers:[ MessageService, ConfirmationService],
})
export class MarcasComponent {
  marDialog: boolean = false;
  marcas!: Marca[];
  marca!: Marca;

  selectedMarcas!: Marca[] | null;
  submitted: boolean = false;

    statuses!: any[];
    title: string = "";
    indexSelected : number = -1;

    constructor(private marcaService: MarcaService, private messageService: MessageService, private confirmationService: ConfirmationService) {}


  ngOnInit(): void{
  this.marcaService.getAll().subscribe(
    response => {
      this.marcas = response as Marca[];
      //console.log(response);
    }
  );
}

openNew() {
  this.marca = {};
  this.submitted = false;
  this.marDialog = true;
  this.title = "Agregar Marca"
}

editMarca(marca: Marca) {
  this.marca = { ...marca};
  this.marDialog = true;
  this.title = "Actualizar Marca"
  this.indexSelected = this.marcas.indexOf(marca);
}

deleteMarca(marca: Marca) {
  this.confirmationService.confirm({
      message: 'Seguro/a eliminar esta marca',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.marcaService.delete(marca.id).subscribe({
            next: (response) => {
              this.marcas = this.marcas.filter((val) => val.id !== marca.id);
              this.marca = {};
              this.messageService.add({ severity: 'success', summary: 'Resultado', detail: `${response.message}`, life: 3000 });
          },
          error: (err) =>{
            this.messageService.add({ severity: 'error', summary: 'Resultado', detail: `${err.message}`, life: 3000 });
          }
        }
        );
      }
  });
}
hideDialog() {
  this.marDialog = false;
  this.submitted = false;
}

//metodo para guardar una marca
create ():void{
this.submitted = true;
this.marcaService.create(this.marca).subscribe({
next: (json) => {
this.marcas.unshift(json.marca);
this.messageService.add({severity: 'success', summary: 'Confirmado', detail: '${json.message}', life: 3000});
},
error: (err) => {
  if (err.status == 409){
    this.messageService.add({severity: 'error', summary: 'Resultado', detail: `${err.error.message}`, life: 3000});
  }
this.messageService.add({severity: 'error', summary: 'Resultado', detail: '${err.error}', life: 3000});
console.log('code status: '+err.status);
console.log(err.message);
}
});
this.marDialog = false;
this.marca = {}
}

update():void {
  this.submitted = true;
  let id = this.marca.id;
  this.marcaService.update(this.marca,id).subscribe({

  next: (json) =>{
    Object.assign(this.marcas[this.indexSelected],json.marca);

  this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
  },
  error: (err) => {
    this.messageService.add({severity: 'error', summary: 'Resultado', detail: '${err.error}', life: 3000});
    console.log('code status: '+err.status);
    console.log(err.message);
  }
})
this.marDialog = false;
this.marca = {};
}

getEventValue($event:any):string{
return $event.target.value;
}

}

