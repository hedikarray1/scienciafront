import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionReservationRoutingModule } from './gestion-reservation-routing.module';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ListeReservationComponent } from './liste-reservation/liste-reservation.component';
import {ScheduleModule, AgendaService, DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { AddReservationFormationComponent } from './add-reservation-formation/add-reservation-formation.component';
import { ListReservationFormateurComponent } from './list-reservation-formateur/list-reservation-formateur.component';

import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [AddReservationComponent, ListeReservationComponent, AddReservationFormationComponent, ListReservationFormateurComponent],
  imports: [
    CommonModule,
    GestionReservationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    Ng2SearchPipeModule,
    ScheduleModule,
    MatTabsModule
  ],
  providers: [AgendaService, DayService, WeekService, WorkWeekService, MonthService],
})
export class GestionReservationModule { }
