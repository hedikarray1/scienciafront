import { Globals } from './../../../globals';
import { Stock } from './../../../model/stock';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StockService {



  private API_URL = this.global.adresseBackEnd + '/stock/';


  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  
  constructor(private httpClient: HttpClient , private global : Globals) {}
  
 
   getAll(): Observable<Stock[]> {
     return this.httpClient.get<Stock[]>(this.API_URL + 'getAll').pipe(
       catchError(this.errorHandler)
     );
   }

   getById(id): Observable<Stock> {
    let  params = { id : id} ;
      return this.httpClient.post<Stock>(this.API_URL + 'getById' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
  }
 
  uploadImage(id ,file) : any{

     
    
    var formData : any = new FormData();
    formData.append("file", file);
    formData.append("id", id +"");
    formData.append("photo", "image_stock_" + id+".png");
    let  httpOptions = {
      headers: new HttpHeaders()
    };
console.log("service upload image stock form Data :",formData);
return  this.httpClient.post(this.API_URL + 'uploadImageStock', formData,httpOptions).pipe(
  catchError(this.errorHandler)
);
  }

   create(stock): Observable<Stock> {
     console.log(JSON.stringify(stock));
     return this.httpClient.post<Stock>(this.API_URL + 'create', JSON.stringify(stock), this.httpOptions)
     .pipe(
       catchError(this.errorHandler)
     );
   }

   modifier(stock): Observable<Stock> {
    console.log(JSON.stringify(stock));
    return this.httpClient.post<Stock>(this.API_URL + 'update', JSON.stringify(stock), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }
 
   delete(id): Observable<Stock> {
    let  params = { id : id} ;
    return this.httpClient.post<Stock>(this.API_URL + 'delete', JSON.stringify(params), this.httpOptions)
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
