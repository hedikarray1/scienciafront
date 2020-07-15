import { Globals } from './../globals';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable , throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {



private API_URL = this.global.adresseBackEnd + '/user/';


private httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

constructor(private httpClient: HttpClient , private global : Globals) {}


  getAll(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.API_URL + 'getAll').pipe(
      catchError(this.errorHandler)
    );
  }

  getByRole(role): Observable<User[]> {
  let  params = { role : role} ;
    return this.httpClient.post<User[]>(this.API_URL + 'getByRole' , JSON.stringify(params), this.httpOptions).pipe(
      catchError(this.errorHandler)
    );
  }

  
  getByRoleAndRegion(role,region): Observable<User[]> {
    let  params = { 
      role : role,
      adresse : region
    } ;
      return this.httpClient.post<User[]>(this.API_URL + 'getByRoleAndRegion' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
    }

  
  getById(id): Observable<User> {
    let  params = { id : id} ;
      return this.httpClient.post<User>(this.API_URL + 'getById' , JSON.stringify(params), this.httpOptions).pipe(
        catchError(this.errorHandler)
      );
    }

    delete(id): Observable<any> {
      let  params = { id : id} ;
        return this.httpClient.post(this.API_URL + 'delete' , JSON.stringify(params), this.httpOptions).pipe(
          catchError(this.errorHandler)
        );
      }

    updatePassword(id , pwd): Observable<any>  {
      let  params = { id : id , password : pwd} ;
        return this.httpClient.post(this.API_URL + 'updatePassword' , JSON.stringify(params), this.httpOptions).pipe(
          catchError(this.errorHandler)
        );
      }

      bloquerUser(id ): Observable<any>  {
        let  params = { id : id} ;
          return this.httpClient.post(this.API_URL + 'bloquer' , JSON.stringify(params), this.httpOptions).pipe(
            catchError(this.errorHandler)
          );
        }

        debloquerUser(id ): Observable<any>  {
          let  params = { id : id} ;
            return this.httpClient.post(this.API_URL + 'debloquer' , JSON.stringify(params), this.httpOptions).pipe(
              catchError(this.errorHandler)
            );
          }

    uploadImage(id,file) : Observable<any> {
      const formData = new FormData();
      formData.append("file", file.file, file.file.name);
      formData.append("id", id);
      formData.append("photo", "photo_profile_" +id);

      let  params = { id : id ,
                      file :file ,
                      photo : "hhhhhh_photo_profile_" + id
      } ;
      console.log("service upload image formdat :",formData);
      console.log("service upload image params :", JSON.stringify(params));
        return this.httpClient.post(this.API_URL + 'uploadImageUser' , formData).pipe(
          catchError(this.errorHandler)
        );
      }
  
  create(user): Observable<User> {
    console.log(JSON.stringify(user));
    return this.httpClient.post<User>(this.API_URL + 'create', JSON.stringify(user), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  
  update(user : User): Observable<User> {
    console.log(JSON.stringify(user));
    return this.httpClient.post<User>(this.API_URL + 'update', JSON.stringify(user), this.httpOptions)
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
