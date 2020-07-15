import { Globals } from './../../../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { FeedBack } from './../../../model/feed-back';
import { throwError, Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeedBackService {

 
  private API_URL = this.global.adresseBackEnd + '/feedback/';


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient , private global : Globals) { 
    
  }
  
    getAll(): Observable<FeedBack[]> {
      return this.httpClient.get<FeedBack[]>(this.API_URL + 'getAll').pipe(
        catchError(this.errorHandler)
      );
    }
  
    getByIdFormation(id): Observable<FeedBack[]> {
     let  params = { id_reservation_formation : id} ;
      return this.httpClient.post<FeedBack[]>(this.API_URL + 'getByIdFormation', JSON.stringify(params), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
    }

    getByIdEcole(id): Observable<FeedBack[]> {
      let  params = { id_ecole : id} ;
       return this.httpClient.post<FeedBack[]>(this.API_URL + 'getByIdEcole', JSON.stringify(params), this.httpOptions)
       .pipe(
         catchError(this.errorHandler)
       );
     }
  
    create(feedback): Observable<FeedBack> {
      console.log(JSON.stringify(feedback));
      return this.httpClient.post<FeedBack>(this.API_URL + 'create', JSON.stringify(feedback), this.httpOptions)
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
