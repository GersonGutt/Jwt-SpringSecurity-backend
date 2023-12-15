import { Injectable } from '@angular/core';
import { Usuario } from './usuario';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: Usuario;
  private _token: string;

  constructor(private http: HttpClient) { }
  //creamos propiedades para el usuario y el token
  public get usuario():Usuario{
    if(this._user != null){
    return this._user;
    }else if(this._user == null && sessionStorage.getItem('usuario') != null){
    this._user = JSON.parse(sessionStorage.getItem('usuario'));
    return this._user;
    }
    return new Usuario();
  }
public get token(): string{
  if(this._token != null){
    return this._token;
  }else if(this.token == null && sessionStorage.getItem('token') != null){
    this._token = sessionStorage.getItem('token');
    return this._token;
  }
  return null;

}

  login(usuario: Usuario): Observable<any>{
  const urlEndPointAuth = 'http://localhost:8080/auth/login';

  const httpHeaders = new HttpHeaders({"Content-Type":'application/json'});
  return this.http.post<any>(urlEndPointAuth,usuario,{headers:httpHeaders});
  }

  obtenerDatosToken(token: string): any{
  if(token !=null){
  return JSON.parse(window.atob(token.split(".")[1]))
  }
  return null;
  }
  isAuthenticated(): boolean{
  let payLoad = this.obtenerDatosToken(this.token);
  return false;
  }
  guardarUsuario(accesToken: string):void{
  let payLoad = this.obtenerDatosToken(accesToken);
  this._user = new Usuario();
  this._user.username = payLoad.username;
  this._user.nombre = payLoad.nombre;
  this._user.correo = payLoad.correo;
  this._user.role = payLoad.role;
  sessionStorage.setItem('usuario',JSON.stringify(this._user));
  }
  guardarToken(accessToken: string): void{
  this._token = accessToken;
  sessionStorage.setItem('token',this._token);
  }

  logout(): void{
    this._token = null;
    this._user = null;
    sessionStorage.clear(); //elimina todos los items de la sesion
    //sessionStorage.removeItem('token'); //elimina un item de la sesion

  }

}
