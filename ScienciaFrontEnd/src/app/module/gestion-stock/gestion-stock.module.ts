import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModifierStockComponent } from './pages/modifier-stock/modifier-stock.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionStockRoutingModule } from './gestion-stock-routing.module';
import { ListStockComponent } from './pages/list-stock/list-stock.component';
import { AddStockComponent } from './pages/add-stock/add-stock.component';


@NgModule({
  declarations: [ListStockComponent, AddStockComponent, ModifierStockComponent],
  imports: [
    CommonModule,
    GestionStockRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ]
})
export class GestionStockModule { }
