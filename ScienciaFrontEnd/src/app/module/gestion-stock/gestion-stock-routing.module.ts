import { ListStockComponent } from './pages/list-stock/list-stock.component';
import { AddStockComponent } from './pages/add-stock/add-stock.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: 'gestionStock/addStock', component: AddStockComponent},
  { path: 'gestionStock/listStock', component: ListStockComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionStockRoutingModule { }
