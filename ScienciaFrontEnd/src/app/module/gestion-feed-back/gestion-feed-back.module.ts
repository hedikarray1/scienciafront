import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionFeedBackRoutingModule } from './gestion-feed-back-routing.module';
import { ListFeedBackComponent } from './pages/list-feed-back/list-feed-back.component';


@NgModule({
  declarations: [ListFeedBackComponent],
  imports: [
    CommonModule,
    GestionFeedBackRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ]
})
export class GestionFeedBackModule { }
