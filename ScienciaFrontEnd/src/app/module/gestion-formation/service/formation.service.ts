import { Globals } from './../../../globals';
import { catchError } from 'rxjs/operators';
import { Formation } from './../../../model/formation';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormationService {


  private API_URL = this.global.adresseBackEnd + '/formation/';


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private httpClient: HttpClient , private global : Globals) {}
  
    getAll(): Observable<Formation[]> {
      return this.httpClient.get<Formation[]>(this.API_URL + 'getAll').pipe(
        catchError(this.errorHandler)
      );
    }

    uploadPdf(id ,file) : any{

     
    
      var formData : any = new FormData();
      formData.append("file", file);
      formData.append("id", id +"");
      formData.append("detail_pdf", "pdf_formation_" + id+".pdf");
      let  httpOptions = {
        headers: new HttpHeaders()
      };
  console.log("service upload pdf form Data :",formData);
 return  this.httpClient.post(this.API_URL + 'uploadPdf', formData,httpOptions).pipe(
    catchError(this.errorHandler)
  );
    }
  
    
    
  getById(id): Observable<Formation> {
    let  params = { id : id} ;
      return this.httpClient.post<Formation>(this.API_URL + 'getById' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
    }

   create(formation): Observable<Formation> {
    console.log(JSON.stringify(formation));
    return this.httpClient.post<Formation>(this.API_URL + 'create', JSON.stringify(formation), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  modifier(formation): Observable<Formation> {
    console.log(JSON.stringify(formation));
    return this.httpClient.post<Formation>(this.API_URL + 'update', JSON.stringify(formation), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id): Observable<Formation> {
  
   let  params = { id : id} ;
   return this.httpClient.post<Formation>(this.API_URL + 'delete', JSON.stringify(params), this.httpOptions)
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
