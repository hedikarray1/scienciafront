import { KitDemander } from './../model/kit-demander';
import { User } from './../model/user';
import { Injectable } from '@angular/core';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const BACKGROUND_STATE_KEY = 'backgound-state';
const PANIER_DEMANDE_KIT_KEY = 'panier_demande_kit';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user :User) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public saveBackgroundState(etat) {
    window.sessionStorage.removeItem(BACKGROUND_STATE_KEY);
    window.sessionStorage.setItem(BACKGROUND_STATE_KEY, JSON.stringify(etat));
  }

  public getBackgroundState() {
    return JSON.parse(sessionStorage.getItem(BACKGROUND_STATE_KEY));
  }

  
  public savePanierDemandeKit(kits : Array<KitDemander>) {
    window.sessionStorage.removeItem(PANIER_DEMANDE_KIT_KEY);
    window.sessionStorage.setItem(PANIER_DEMANDE_KIT_KEY, JSON.stringify(kits));
  }

  public getPanierDemandeKit() : Array<KitDemander> {
    return JSON.parse(sessionStorage.getItem(PANIER_DEMANDE_KIT_KEY));
  }
}

