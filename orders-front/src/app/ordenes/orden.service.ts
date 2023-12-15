import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { Orden } from './orden';

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  private urlEndPoint : string = "http://localhost:8080/api/ordenes";
  private httpHeaders: HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient, private router: Router) { }

  getAllRecibidas() : Observable<Orden[]>{
  return this.http.get<Orden[]>(this.urlEndPoint, {headers: this.httpHeaders});
  }

  getAllDespachadas() : Observable<Orden[]>{
  return this.http.get<Orden[]>(this.urlEndPoint + "/despachadas", {headers: this.httpHeaders});
  }

  getAllAnuladas() : Observable<Orden[]>{
  return this.http.get<Orden[]>(this.urlEndPoint + "/anuladas", {headers: this.httpHeaders});
  }
  changeState(orden: Orden, estado: string) : Observable<any>{
  return this.http.put<any>(`${this.urlEndPoint}/change-state?estado=${estado}`, orden,{headers: this.httpHeaders}).pipe(

    catchError(e => {
    console.log(e.message);
    return throwError(()=> e);
    })
    )
  }

  createOrder(orden: Orden): Observable<any>{
    return this.http.post(`${this.urlEndPoint}`,orden,{headers: this.httpHeaders}).pipe(

      catchError(e => {
        if(e.status == 400){
          return throwError(()=> e);
        }
        if(e.status == 409){
          console.log(e.message);
        }
        return throwError(()=> e);
      })
    )
  }
}
