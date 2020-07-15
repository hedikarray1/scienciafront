import { Globals } from './../globals';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

   private AUTH_API =this.global.adresseBackEnd + '/auth/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient , private global : Globals) { 
    
  }

  login(credentials): Observable<any> {
    return this.http.post(this.AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, this.httpOptions);
  }

  register(user): Observable<any> {
    return this.http.post(this.AUTH_API + 'signup', {
      username: user.username,
      email: user.email,
      password: user.password,
      nom: user.nom,
      prenom: user.prenom,
      adresse: user.adresse,
      photo: user.photo,
      telephone: user.telephone,
      role: user.role,
      nom_ecole: user.nom_ecole,
      etat: user.etat,
      dateNaissance: user.dateNaissance
    }, this.httpOptions);
  }
}

