import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionEmploiRoutingModule } from './gestion-emploi-routing.module';
import { AfficherEmploiComponent } from './pages/afficher-emploi/afficher-emploi.component';
import {ScheduleModule, AgendaService, DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';



@NgModule({
  declarations: [AfficherEmploiComponent],
  imports: [
    CommonModule,
    GestionEmploiRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ScheduleModule,
  
  ],
  providers: [AgendaService, DayService, WeekService, WorkWeekService, MonthService],
})
export class GestionEmploiModule { }
