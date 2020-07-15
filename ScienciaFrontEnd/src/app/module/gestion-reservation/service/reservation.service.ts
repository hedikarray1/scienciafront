import { Globals } from './../../../globals';
import { Reservation } from './../../../model/reservation';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {


private API_URL = this.global.adresseBackEnd + '/reservation_formation/';


private httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

constructor(private httpClient: HttpClient , private global : Globals) {}


  getAll(): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(this.API_URL + 'getAll').pipe(
      catchError(this.errorHandler)
    );
  }

  getByEcoleId(id): Observable<Reservation[]> {
   let  params = { id_ecole : id} ;
    return this.httpClient.post<Reservation[]>(this.API_URL + 'getByIdEcole', JSON.stringify(params), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  
  getByEcoleIdAndStatus(id,status): Observable<Reservation[]> {
    let  params = { 
      id_ecole : id,
      status : status
    } ;
     return this.httpClient.post<Reservation[]>(this.API_URL + 'getByIdEcoleAndStatus', JSON.stringify(params), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     );
   }

  
  getByFormateurId(id): Observable<Reservation[]> {
    let  params = { id_formateur : id} ;
     return this.httpClient.post<Reservation[]>(this.API_URL + 'getByIdFormateur', JSON.stringify(params), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     );
   }

   
  updateStatus(id , status): any {
    let  params = { 
      id : id ,
      status : status
    } ;
     return this.httpClient.post(this.API_URL + 'updateStatus', JSON.stringify(params), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     );
   }

   
   
  updateStatusValidation(id , status): any {
    let  params = { 
      id : id ,
      status_validation : status
    } ;
     return this.httpClient.post(this.API_URL + 'updateStatusValidation', JSON.stringify(params), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     );
   }

   
   
  updateReservationValidation(formation): any {
   
     return this.httpClient.post(this.API_URL + 'validerFormationFormateur', JSON.stringify(formation), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     );
   }

   
  getActiviteFormateur(id): Observable<any[]> {
    let  params = { id_formateur : id} ;
     return this.httpClient.post<any[]>(this.API_URL + 'getActiviteFormateur', JSON.stringify(params), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     );
   }

   
  getDemandeActiviteFormateur(id): Observable<Reservation[]> {
    let  params = { id_formateur : id} ;
     return this.httpClient.post<Reservation[]>(this.API_URL + 'getDemandeActiviteFormateur', JSON.stringify(params), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     );
   }

   
  getHistoriqueDemandeFormateur(id,status): Observable<Reservation[]> {
    let  params = { 
      id_formateur : id ,
      status :status
    } ;
     return this.httpClient.post<Reservation[]>(this.API_URL + 'getHistoriqueDemandeFormateur', JSON.stringify(params), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     );
   }

   
  getFormationFormateurValider(id,status): Observable<Reservation[]> {
    let  params = { 
      id_formateur : id ,
      status_validation :status
    } ;
     return this.httpClient.post<Reservation[]>(this.API_URL + 'getFormationFormateurValider', JSON.stringify(params), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     );
   }


  create(reservation): Observable<Reservation> {
    console.log(JSON.stringify(reservation));
    return this.httpClient.post<Reservation>(this.API_URL + 'create', JSON.stringify(reservation), this.httpOptions)
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
