import { ListTypeComponent } from './module/gestion-type/pages/list-type/list-type.component';
import { AddTypeComponent } from './module/gestion-type/pages/add-type/add-type.component';
import { DetailEcoleComponent } from './module/gestion-user/pages/detail-ecole/detail-ecole.component';
import { DetailFormateurComponent } from './module/gestion-user/pages/detail-formateur/detail-formateur.component';
import { DetailEmployeComponent } from './module/gestion-user/pages/detail-employe/detail-employe.component';
import { ListFeedBackComponent } from './module/gestion-feed-back/pages/list-feed-back/list-feed-back.component';
import { ListDemandeEmplyeComponent } from './module/gestion-demande-kit/pages/list-demande-emplye/list-demande-emplye.component';
import { ListDemandeComponent } from './module/gestion-demande-kit/pages/list-demande/list-demande.component';
import { ListKitComponent } from './module/gestion-demande-kit/pages/list-kit/list-kit.component';
import { ListReservationFormateurComponent } from './module/gestion-reservation/list-reservation-formateur/list-reservation-formateur.component';
import { AddReservationFormationComponent } from './module/gestion-reservation/add-reservation-formation/add-reservation-formation.component';
import { ListFormationEcoleComponent } from './module/gestion-formation/pages/list-formation-ecole/list-formation-ecole.component';
import { ModifierPasswordProfileComponent } from './module/gestion-user/pages/modifier-password-profile/modifier-password-profile.component';
import { ModifierPasswordComponent } from './module/gestion-user/pages/modifier-password/modifier-password.component';
import { DetailUserComponent } from './module/gestion-user/pages/detail-user/detail-user.component';
import { ModifierUserComponent } from './module/gestion-user/pages/modifier-user/modifier-user.component';
import { ModifierProfileComponent } from './module/gestion-user/pages/modifier-profile/modifier-profile.component';
import { ModifierFormationComponent } from './module/gestion-formation/pages/modifier-formation/modifier-formation.component';
import { ModifierStockComponent } from './module/gestion-stock/pages/modifier-stock/modifier-stock.component';
import { AfficherEmploiComponent } from './module/gestion-emploi/pages/afficher-emploi/afficher-emploi.component';
import { MessagerieComponent } from './module/gestion-messagerie/messagerie/messagerie.component';
import { AddFormationComponent } from './module/gestion-formation/pages/add-formation/add-formation.component';
import { ListFormationComponent } from './module/gestion-formation/pages/list-formation/list-formation.component';
import { ListStockComponent } from './module/gestion-stock/pages/list-stock/list-stock.component';
import { AddStockComponent } from './module/gestion-stock/pages/add-stock/add-stock.component';
import { ListeReservationComponent } from './module/gestion-reservation/liste-reservation/liste-reservation.component';
import { ListeUserComponent } from './module/gestion-user/pages/liste-user/liste-user.component';
import { AddUserComponent } from './module/gestion-user/pages/add-user/add-user.component';
import { AddReservationComponent } from './module/gestion-reservation/add-reservation/add-reservation.component';

import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListFormateurComponent } from './module/gestion-user/pages/list-formateur/list-formateur.component';
import { ListEmployeComponent } from './module/gestion-user/pages/list-employe/list-employe.component';
import { ListEcoleComponent } from './module/gestion-user/pages/list-ecole/list-ecole.component';


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },

  { path: 'profile/modifier', component: ModifierProfileComponent },
  { path: 'profile/modifierPassword', component: ModifierPasswordProfileComponent },

  { path: 'gestionUser', redirectTo: 'gestionUser/listeUser', pathMatch: 'full' },

  //{ path: 'gestionDemendeKit', redirectTo: 'gestionDemendeKit/listKits', pathMatch: 'full' },
  { path: 'gestionReservation', redirectTo: 'gestionReservation/listeReservation', pathMatch: 'full' },
  { path: 'gestionReservationFormateur', redirectTo: 'gestionReservationFormateur/listeReservationFormateur', pathMatch: 'full' },
  { path: 'gestionStock', redirectTo: 'gestionStock/listStock', pathMatch: 'full' },
  { path: 'gestionFormation', redirectTo: 'gestionFormation/listFormation', pathMatch: 'full' },
  { path: 'gestionFormationEcole', redirectTo: 'gestionFormationEcole/listFormationEcole', pathMatch: 'full' },

  { path: 'gestionFacture', component: HomeComponent },
  { path: 'gestionFeedBack', component: ListFeedBackComponent },
  { path: 'gestionEmploi', component: AfficherEmploiComponent },
  { path: 'gestionDemande', component: HomeComponent },
  { path: 'gestionFormation', component: ListFormationComponent },
  { path: 'messagerie', component: MessagerieComponent },
  { path: 'gestionDemendeKit', component: ListKitComponent },
  { path: 'gestionDemendeEmploye', component: ListDemandeEmplyeComponent },
 
  
  { path: 'gestionFormationEcole/listFormationEcole', component: ListFormationEcoleComponent},


  { path: 'gestionUser/addUser', component: AddUserComponent },
  { path: 'gestionUser/listeUser', component: ListeUserComponent }, 
  { path: 'gestionUser/listeFormateur', component: ListFormateurComponent }, 
  { path: 'gestionUser/listeEmploye', component: ListEmployeComponent }, 
  { path: 'gestionUser/listeEcole', component: ListEcoleComponent }, 
  { path: 'gestionUser/modifierUser/:id', component: ModifierUserComponent }, 
  { path: 'gestionUser/modifierPasswordUser/:id', component: ModifierPasswordComponent }, 
  { path: 'gestionUser/detailUser/:id', component: DetailUserComponent }, 
  { path: 'gestionUser/detailEcole/:id', component: DetailEcoleComponent}, 
  { path: 'gestionUser/detailFormateur/:id', component: DetailFormateurComponent }, 
  { path: 'gestionUser/detailEmploye/:id', component: DetailEmployeComponent }, 


  { path: 'gestionReservation/listeReservation', component: ListeReservationComponent },
  { path: 'gestionReservationFormateur/listeReservationFormateur', component: ListReservationFormateurComponent },
  { path: 'gestionReservation/addReservation', component: AddReservationComponent},
  { path: 'gestionReservation/addReservation2/:id', component: AddReservationFormationComponent},

  { path: 'gestionStock/addStock', component: AddStockComponent},
  { path: 'gestionStock/listStock', component: ListStockComponent},
  { path: 'gestionStock/modifierStock/:id', component: ModifierStockComponent},

  { path: 'gestionType/addType', component: AddTypeComponent},
  { path: 'gestionType/listType', component: ListTypeComponent},
  { path: 'gestionType/modifierType/:id', component: ModifierStockComponent},
  
  { path: 'gestionFormation/listFormation', component: ListFormationComponent},
  { path: 'gestionFormation/addFormation', component: AddFormationComponent},
  { path: 'gestionFormation/modifierFormation/:id', component: ModifierFormationComponent},

  {path: 'gestionDemendeKit/listKits', component: ListKitComponent},
  {path: 'gestionDemendeKit/listDemande', component: ListDemandeComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
