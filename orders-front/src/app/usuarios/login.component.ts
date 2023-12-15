import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import { AuthService } from './auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[MessageService,ConfirmationService]
})
export class LoginComponent implements OnInit{

  title: string ="Autenticacion de Usuarios";
  usuario: Usuario;
  constructor(private messageService:MessageService, private confirmService:ConfirmationService,
    private authService:AuthService){
      this.usuario = new Usuario();
    }
    ngOnInit():void{

    }
    login():void{
    if(this.usuario.username == null || this.usuario.password == null){
    Swal.fire('Error', 'Digite username y password','error');
    return;
    }
    this.authService.login(this.usuario).subscribe(
      response=> {
      console.log(response);
      console.log(this.authService.obtenerDatosToken(response));
      //guardamos el usuario en el LocalStorage
      }
    )
  }
}
