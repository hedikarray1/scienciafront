import { Reservation } from './reservation';
import { User } from './user';
export interface FeedBack {
    id : number ;
    message : String ;
    date : Date ;
    id_ecole : number ;
    id_reservation_formation : number ;
    ecole : User ;
    reservation : Reservation ;
}
