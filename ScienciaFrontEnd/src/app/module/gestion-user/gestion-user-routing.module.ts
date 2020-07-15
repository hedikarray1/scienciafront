import { AddUserComponent } from './pages/add-user/add-user.component';
import { ListeUserComponent } from './pages/liste-user/liste-user.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'listeUser', pathMatch: 'full' },
  { path: 'listeUser', component: ListeUserComponent},
  { path: 'addUser', component: AddUserComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionUserRoutingModule { }
