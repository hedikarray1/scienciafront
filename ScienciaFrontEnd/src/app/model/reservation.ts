import { User } from './user';
import { Formation } from './formation';
import { Time } from '@angular/common';
export interface Reservation {
    id: number ;
    id_formateur: number ;
    id_ecole: number ;
    id_formation: number ;
    nbr_enfants: number ;
    date_formation: Date;
    date_reservation: Date;
    prix_totale: number;
    formation : Formation ;
    formateur : User ;
    ecole : User ;
    status : number ;
    status_validation : number ;
}
