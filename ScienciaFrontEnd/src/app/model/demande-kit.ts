import { User } from './user';
import { KitDemander } from './kit-demander';
export interface DemandeKit {     
   id: number ; 
  id_formateur: number ;
  id_employe : number
  prix : number ;
  etat: number ; 
  etat_livraison: number ; 
  date_demande: Date ;
  formateur : User ;
  employe : User ;
  kits : KitDemander[] ; 
}
