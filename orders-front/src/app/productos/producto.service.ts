import { Injectable } from '@angular/core';
import { Producto } from './producto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private urlEndPoint: string = "http://localhost:8080/api/productos";
  private httpHeader: HttpHeaders = new HttpHeaders({'content-type':'aplication/json'});

  constructor(private http: HttpClient) { }

  getAllActivos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint);
  }
  getAllInactivos(): Observable<Producto[]>{
    return this.http.get<Producto[]>(this.urlEndPoint + '/inactivos');
  }
  getById(id:number): Observable<Producto>{
    return this.http.get<Producto>(`${this.urlEndPoint}/${id}`);
  }
  create (producto: Producto): Observable<any>{
    return this.http.post(this.urlEndPoint, producto);
  }
  update(producto: Producto, id:number):Observable<any> {
    return this.http.put(`${this.urlEndPoint}/${id}`, producto);
  }
  changeState(estado:string, producto: Producto): Observable<any>{
  return this.http.put(`${this.urlEndPoint}/change-state?estado=${estado}`, producto);
  }

}
