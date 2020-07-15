import { GestionFeedBackModule } from './module/gestion-feed-back/gestion-feed-back.module';
import { Globals } from './globals';
import { DialogModifierImageProfilComponent } from './module/material/dialog-modifier-image-profil/dialog-modifier-image-profil.component';
import { DialogFeedbackComponent } from './module/material/dialog-feedback/dialog-feedback.component';
import { DiglogSuppressionComponent } from './module/material/diglog-suppression/diglog-suppression.component';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { authInterceptorProviders } from './helpers/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { GestionReservationModule } from './module/gestion-reservation/gestion-reservation.module';
import { GestionUserModule } from './module/gestion-user/gestion-user.module';
import { GestionStockModule } from './module/gestion-stock/gestion-stock.module';
import { GestionFormationModule } from './module/gestion-formation/gestion-formation.module';


import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { GestionEmploiModule } from './module/gestion-emploi/gestion-emploi.module';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { GestionMessagerieModule } from './module/gestion-messagerie/gestion-messagerie.module';
import { MaterialModule } from './module/material/material.module';

import {ScheduleModule, AgendaService, DayService, WeekService, WorkWeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { GestionDemandeKitModule } from './module/gestion-demande-kit/gestion-demande-kit.module';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerModule } from 'ng2-pdf-viewer';


import {OverlayModule} from '@angular/cdk/overlay';
import { ClickOutsideModule } from 'ng-click-outside';
import {MatBadgeModule} from '@angular/material/badge';

import {MatSliderModule} from '@angular/material/slider';

import {MatTabsModule} from '@angular/material/tabs';
import { GestionFactureModule } from './module/gestion-facture/gestion-facture.module';
import { GestionTypeModule } from './module/gestion-type/gestion-type.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    GestionReservationModule,
    GestionUserModule,
    GestionStockModule,
    GestionFormationModule,
    GestionEmploiModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory }),
    GestionMessagerieModule,
    MaterialModule,
    ScheduleModule,
    GestionDemandeKitModule,
    Ng2SearchPipeModule,
    NgxExtendedPdfViewerModule,
    PdfViewerModule,
    OverlayModule,
    ClickOutsideModule,
    MatBadgeModule,
    MatSliderModule,
    MatTabsModule,
    GestionFeedBackModule,
    GestionFactureModule,
    GestionTypeModule
  ],
  exports: [
   
     FormsModule,
    ReactiveFormsModule
  ],
  schemas : [CUSTOM_ELEMENTS_SCHEMA],
  providers: [authInterceptorProviders,AgendaService, DayService, WeekService, WorkWeekService, MonthService, Globals ],
  bootstrap: [AppComponent],
  entryComponents: [DiglogSuppressionComponent,DialogFeedbackComponent, DialogModifierImageProfilComponent]
})
export class AppModule { }
