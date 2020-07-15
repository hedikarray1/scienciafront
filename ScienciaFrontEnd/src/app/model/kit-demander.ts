import { DemandeKit } from './demande-kit';
import { Stock } from './stock';
export interface KitDemander {   
   id:    number ;
  id_demande:  number ;
  id_kit:  number ;
  quantite:  number ;
  demande : DemandeKit ;
  kit : Stock ;
}
