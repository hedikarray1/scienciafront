import { AddFormationComponent } from './pages/add-formation/add-formation.component';
import { ListFormationComponent } from './pages/list-formation/list-formation.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'gestionFormation/listFormation', component: ListFormationComponent},
  { path: 'gestionFormation/addFormation', component: AddFormationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionFormationRoutingModule { }
