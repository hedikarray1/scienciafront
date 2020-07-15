import { Reservation } from './reservation';
import { User } from './user';
export interface Facture {

    id : number ;
    id_reservation: number ;
    prix: number ;
    id_ecole : number ;
    date_facture: Date ;
    etat: number ;
    ecole : User ;
    reservation : Reservation ;
    
}  
        
      
      
