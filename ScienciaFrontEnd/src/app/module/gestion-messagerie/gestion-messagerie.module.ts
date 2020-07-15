import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionMessagerieRoutingModule } from './gestion-messagerie-routing.module';
import { MessagerieComponent } from './messagerie/messagerie.component';


@NgModule({
  declarations: [MessagerieComponent],
  imports: [
    CommonModule,
    GestionMessagerieRoutingModule,
     FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ]
})
export class GestionMessagerieModule { }
