import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ListeReservationComponent } from './liste-reservation/liste-reservation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'listeUser', pathMatch: 'full' },
  { path: 'listeReservation', component: ListeReservationComponent},
  { path: 'addReservation', component: AddReservationComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionReservationRoutingModule { }
