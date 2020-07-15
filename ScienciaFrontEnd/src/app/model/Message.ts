import { User } from './user';
export interface Message {
    id: number ;
    id_expediteur : number ;
    id_destinataire : number ;
    date: Date ;
    message:  Text ;
    state: number ; 
    id_conversation : string ; 
    expediteur : User;
    destinataire : User;
}