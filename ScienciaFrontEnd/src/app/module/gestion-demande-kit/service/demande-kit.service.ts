import { Globals } from './../../../globals';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { DemandeKit } from './../../../model/demande-kit';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DemandeKitService {



  private API_URL = this.global.adresseBackEnd + '/demandeKit/';


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private httpClient: HttpClient , private global : Globals) {}
  
    getAll(): Observable<DemandeKit[]> {
      return this.httpClient.get<DemandeKit[]>(this.API_URL + 'getAll').pipe(
        catchError(this.errorHandler)
      );
    }
    
  getById(id): Observable<DemandeKit> {
    let  params = { id : id} ;
      return this.httpClient.post<DemandeKit>(this.API_URL + 'getById' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
    }

    
  getByIdFormateur(id): Observable<DemandeKit[]> {
    let  params = { id_formateur : id} ;
      return this.httpClient.post<DemandeKit[]>(this.API_URL + 'getByIdFormateur' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
    }

    
  getByIdFormateurByEtat(id,etat): Observable<DemandeKit[]> {
    let  params = { 
      id_formateur : id,
      etat :etat} ;
      return this.httpClient.post<DemandeKit[]>(this.API_URL + 'getByIdFormateurByEtat' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
    }

    
  getByEtat(etat): Observable<DemandeKit[]> {

    let  params = { etat : etat} ;
      return this.httpClient.post<DemandeKit[]>(this.API_URL + 'getByEtat' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
      
    }

    
    
  getByEtatAndIdEmploye(id,etat): Observable<DemandeKit[]> {

    let  params = { 
            etat : etat,
            id_employe  : id
          } ;
      return this.httpClient.post<DemandeKit[]>(this.API_URL + 'getByEtatAndIdEmploye' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
      
    }


    
  getDemandeValide(id,etat): Observable<DemandeKit[]> {

    let  params = { 
           etat_livraison : etat,
            id_employe  : id
          } ;
      return this.httpClient.post<DemandeKit[]>(this.API_URL + 'getDemandeValideByIdEmploye' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
      
    }

   create(demandeKit): Observable<DemandeKit> {
    console.log(JSON.stringify(demandeKit));
    return this.httpClient.post<DemandeKit>(this.API_URL + 'create', JSON.stringify(demandeKit), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
  
  updateStatus(id,status,id_employe): Observable<any> {
 
    let  params = { 
                    id : id,
                    etat :status,
                    id_employe : id_employe
                  };
    console.log(JSON.stringify(params));
    return this.httpClient.post(this.API_URL + 'updateStatus', JSON.stringify(params), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }


  
  updateStatusLivraison(id,status): Observable<any> {
 
    let  params = { 
                    id : id,
                    etat_livraison :status,
                  };
    console.log(JSON.stringify(params));
    return this.httpClient.post(this.API_URL + 'updateStatusLivraison', JSON.stringify(params), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  

  modifier(demandeKit): Observable<DemandeKit> {
    console.log(JSON.stringify(demandeKit));
    return this.httpClient.post<DemandeKit>(this.API_URL + 'update', JSON.stringify(demandeKit), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  delete(id): Observable<DemandeKit> {
  
   let  params = { id : id} ;
   return this.httpClient.post<DemandeKit>(this.API_URL + 'delete', JSON.stringify(params), this.httpOptions)
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
