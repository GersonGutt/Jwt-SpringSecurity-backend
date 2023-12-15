import { Injectable } from '@angular/core';
import { Marca } from './marca';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MarcaService {

  private urlEndPoint: string = "http://localhost:8080/api/marcas";
  private httpHeader: HttpHeaders = new HttpHeaders({'content-type':'aplication/json'});

  constructor(private http: HttpClient) { }

  getAll(): Observable<Marca[]>{
    return this.http.get<Marca[]>(this.urlEndPoint);
  }
  getById(id:number): Observable<Marca>{
    return this.http.get<Marca>(`${this.urlEndPoint}/${id}`);
  }
  create (marca: Marca): Observable<any>{
    return this.http.post(this.urlEndPoint,marca);
  }
  update(marca: Marca, id:number):Observable<any> {
    return this.http.put(`${this.urlEndPoint}/${id}`, marca);
  }
  delete(id:number): Observable<any>{
  return this.http.delete(`${this.urlEndPoint}/${id}`);
  }
}
