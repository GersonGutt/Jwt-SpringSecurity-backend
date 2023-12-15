import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable} from 'rxjs';
import { Categoria } from './categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private urlEndPoint: string = "http://localhost:8080/api/categorias";
  private httpHeader: HttpHeaders = new HttpHeaders({'content-type':'aplication/json'});

  constructor(private http: HttpClient) { }

  getAll(): Observable<Categoria[]>{
    return this.http.get<Categoria[]>(this.urlEndPoint);
  }
  getById(id:number): Observable<Categoria>{
    return this.http.get<Categoria>(`${this.urlEndPoint}/${id}`);
  }
  create (categoria: Categoria): Observable<any>{
    return this.http.post(this.urlEndPoint,categoria);
  }
  update(categoria: Categoria, id:number):Observable<any> {
    return this.http.put(`${this.urlEndPoint}/${id}`, categoria);
  }
  delete(id:number): Observable<any>{
  return this.http.delete(`${this.urlEndPoint}/${id}`)
  }

}
