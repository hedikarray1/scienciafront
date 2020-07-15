import { Globals } from './../../../globals';
import { catchError } from 'rxjs/operators';
import { Rating } from './../../../model/rating';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Rat } from 'src/app/model/rat';


@Injectable({
  providedIn: 'root'
})



export class RatingService {

  private API_URL = this.global.adresseBackEnd + '/rating_formateur/';


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private httpClient: HttpClient , private global : Globals) {}
  
    getAll(): Observable<Rating[]> {
      return this.httpClient.get<Rating[]>(this.API_URL + 'getAll').pipe(
        catchError(this.errorHandler)
      );
    }
  
    getByEcoleId(id): Observable<Rating[]> {
     let  params = { id_ecole : id} ;
      return this.httpClient.post<Rating[]>(this.API_URL + 'getByIdEcole', JSON.stringify(params), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
    }

    getByFormateurId(id): Observable<Rating[]> {
      let  params = { id_formateur : id} ;
       return this.httpClient.post<Rating[]>(this.API_URL + 'getByIdFormateur', JSON.stringify(params), this.httpOptions)
       .pipe(
         catchError(this.errorHandler)
       );
     }

     getRatingFormateur(id): Observable<Rat> {
      let  params = { id_formateur : id} ;
       return this.httpClient.post<Rat>(this.API_URL + 'getRatingFormateur', JSON.stringify(params), this.httpOptions)
       .pipe(
         catchError(this.errorHandler)
       );
     }

     getRatingFormateurEcole(id_ecole , id_formateur): Observable<Rat> {
      let  params = { id_formateur : id_formateur , id_ecole : id_ecole} ;
       return this.httpClient.post<Rat>(this.API_URL + 'getRatingFormateurEcole', JSON.stringify(params), this.httpOptions)
       .pipe(
         catchError(this.errorHandler)
       );
     }

     getById(id): Observable<Rating[]> {
      let  params = { id : id} ;
       return this.httpClient.post<Rating[]>(this.API_URL + 'getById', JSON.stringify(params), this.httpOptions)
       .pipe(
         catchError(this.errorHandler)
       );
     }
  
    createORupdate(rating): Observable<Rating> {
      console.log(JSON.stringify(rating));
      return this.httpClient.post<Rating>(this.API_URL + 'create', JSON.stringify(rating), this.httpOptions)
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
