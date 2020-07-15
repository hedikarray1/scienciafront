import { Globals } from './../globals';
import { Notification } from './../model/notification';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  private API_URL = this.global.adresseBackEnd + '/notification/';


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private httpClient: HttpClient , private global : Globals) { 
    
  }
  
    getAll(): Observable<Notification[]> {
      return this.httpClient.get<Notification[]>(this.API_URL + 'getAll').pipe(
        catchError(this.errorHandler)
      );
    }

   
    
    
  getById(id): Observable<Notification> {
    let  params = { id : id} ;
      return this.httpClient.post<Notification>(this.API_URL + 'getById' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
    }

    
  getByIdRecepteur(id): Observable<Notification[]> {
    let  params = { id_recepteur : id} ;
      return this.httpClient.post<Notification[]>(this.API_URL + 'getByIdRecepteur' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
    }

    
    
    
    
  countNotifByIdRecepteur(id): Observable<any> {
    let  params = { id_recepteur : id} ;
      return this.httpClient.post<any>(this.API_URL + 'countNotifByIdRecepteur' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
    }

    



   create(notification): Observable<Notification> {
    console.log(JSON.stringify(notification));
    return this.httpClient.post<Notification>(this.API_URL + 'create', JSON.stringify(notification), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  
  createNotifToAllEmploye(notification): Observable<Notification> {
    console.log(JSON.stringify(notification));
    return this.httpClient.post<Notification>(this.API_URL + 'createNotifToAllEmploye', JSON.stringify(notification), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  
  
  updateStatus(id,status): Observable<any> {
 
    let  params = { 
                    id : id,
                    status :status
                  };
    console.log(JSON.stringify(params));
    return this.httpClient.post(this.API_URL + 'updateStatus', JSON.stringify(params), this.httpOptions)
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
