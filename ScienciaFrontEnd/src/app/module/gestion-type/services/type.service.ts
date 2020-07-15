import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Type } from './../../../model/type';
import { Globals } from './../../../globals';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private API_URL = this.global.adresseBackEnd + '/type/';


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private httpClient: HttpClient , private global : Globals) {}
  
 
   getAll(): Observable<Type[]> {
     return this.httpClient.get<Type[]>(this.API_URL + 'getAll').pipe(
       catchError(this.errorHandler)
     );
   }
   getById(id): Observable<Type> {
    let  params = { id : id} ;
      return this.httpClient.post<Type>(this.API_URL + 'getById' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
  }
   create(stock): Observable<Type> {
     console.log(JSON.stringify(stock));
     return this.httpClient.post<Type>(this.API_URL + 'create', JSON.stringify(stock), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     );
   }
   modifier(stock): Observable<Type> {
    console.log(JSON.stringify(stock));
    return this.httpClient.post<Type>(this.API_URL + 'update', JSON.stringify(stock), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
   delete(id): Observable<Type> {
    let  params = { id : id} ;
    return this.httpClient.post<Type>(this.API_URL + 'delete', JSON.stringify(params), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
   errorHandler(error) {
     let errorMessage = '';
     if (error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     console.log(errorMessage);
     return throwError(errorMessage);
  }
 
}
