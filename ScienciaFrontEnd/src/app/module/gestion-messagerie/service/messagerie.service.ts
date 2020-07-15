import { Globals } from './../../../globals';
import { catchError } from 'rxjs/operators';
import { Message } from './../../../model/Message';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessagerieService {


  private API_URL = this.global.adresseBackEnd + '/message/';


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private httpClient: HttpClient , private global : Globals) {}
  
  getAll(): Observable<Message[]> {
    return this.httpClient.get<Message[]>(this.API_URL + 'getAll').pipe(
      catchError(this.errorHandler)
    );
  }


  getMessagechat(message): Observable<Message[]> {
    console.log(JSON.stringify(message));
    return this.httpClient.post<Message[]>(this.API_URL + 'getMessagechat', JSON.stringify(message), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  
  getMessageInBox(id): Observable<Message[]> {
   let msg = {
      "id": id 
    }
    return this.httpClient.post<Message[]>(this.API_URL + 'getMessageInbox', JSON.stringify(msg), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  
  countMsgNotRead(id): Observable<any> {
    let msg = {
       "id": id 
     }
     return this.httpClient.post<any>(this.API_URL + 'countMsgNotRead', JSON.stringify(msg), this.httpOptions)
       .pipe(
         catchError(this.errorHandler)
       );
   }
  



  updateMessagechat(id_cov,id): Observable<any> {
    let params = {
      "id_conversation": id_cov ,
      "id_destinataire": id
    }
    console.log(JSON.stringify(params));
    return this.httpClient.post(this.API_URL + 'updateMessagechat', JSON.stringify(params), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  
  create(message): Observable<Message> {
    console.log("msg envoyer ",JSON.stringify(message));
    return this.httpClient.post<Message>(this.API_URL + 'create', JSON.stringify(message), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  delete(message): Observable<Message> {
    console.log(JSON.stringify(message));

    return this.httpClient.post<Message>(this.API_URL + 'delete', JSON.stringify(message), this.httpOptions)
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
