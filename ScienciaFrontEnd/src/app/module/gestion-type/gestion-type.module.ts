import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionTypeRoutingModule } from './gestion-type-routing.module';
import { AddTypeComponent } from './pages/add-type/add-type.component';
import { ListTypeComponent } from './pages/list-type/list-type.component';


@NgModule({
  declarations: [AddTypeComponent, ListTypeComponent],
  imports: [
    CommonModule,
    GestionTypeRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ]
})
export class GestionTypeModule { }
