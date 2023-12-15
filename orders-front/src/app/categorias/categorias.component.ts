import { Component, OnInit } from '@angular/core';
import { Categoria } from './categoria';
import { CategoriaService } from './categoria.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
  providers:[ MessageService, ConfirmationService],
})
export class CategoriasComponent implements OnInit{

  catDialog: boolean = false;
  categorias!: Categoria[];
  categoria!: Categoria;

  selectedCategorias!: Categoria[] | null;
  submitted: boolean = false;

    statuses!: any[];
    title: string = "";
    indexSelected : number = -1;

    constructor(private categoriaService: CategoriaService, private messageService: MessageService, private confirmationService: ConfirmationService) {}


  ngOnInit(): void{
  this.categoriaService.getAll().subscribe(
    response => {
      this.categorias = response as Categoria[];
      //console.log(response);
    }
  );
}

openNew() {
  this.categoria = {};
  this.submitted = false;
  this.catDialog = true;
  this.title = "Agregar Categoria"
}

editCategoria(categoria: Categoria) {
  this.categoria = { ...categoria};
  this.catDialog = true;
  this.title = "Actualizar Categoria"
  this.indexSelected = this.categorias.indexOf(categoria);
}

deleteCategoria(categoria: Categoria) {
  this.confirmationService.confirm({
      message: 'Seguro/a eliminar esta categoria ' + categoria.nombre + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
          this.categoriaService.delete(categoria.id).subscribe({
            next: (response) => {
              this.categorias = this.categorias.filter((val) => val.id !== categoria.id);
              this.categoria = {};
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
  this.catDialog = false;
  this.submitted = false;
}


//metodo para guardar una categoria
create ():void{
this.submitted = true;
this.categoriaService.create(this.categoria).subscribe({
next: (json) => {
this.categorias.unshift(json.categoria);
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
this.catDialog = false;
this.categoria = {}
}

update():void {
  this.submitted = true;
  let id = this.categoria.id;
  this.categoriaService.update(this.categoria,id).subscribe({

  next: (json) =>{
    Object.assign(this.categorias[this.indexSelected],json.categoria);

  this.messageService.add({severity: 'success', summary: 'Confirmado', detail: `${json.message}`, life: 3000});
  },
  error: (err) => {
    this.messageService.add({severity: 'error', summary: 'Resultado', detail: '${err.error}', life: 3000});
    console.log('code status: '+err.status);
    console.log(err.message);
  }
})
this.catDialog = false;
this.categoria = {};
}

getEventValue($event:any):string{
return $event.target.value;
}

}
