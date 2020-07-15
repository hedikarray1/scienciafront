import { User } from './user';
export interface Notification {
   id : number ;
   id_sender: number ;
   id_recepteur: number ;
   titre: string ;
   redirection: string ;
   date: Date ;
   status: number ;
   sender : User
}
