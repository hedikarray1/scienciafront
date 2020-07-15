import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { MatTabsModule } from '@angular/material/tabs';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionUserRoutingModule } from './gestion-user-routing.module';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { ListeUserComponent } from './pages/liste-user/liste-user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModifierUserComponent } from './pages/modifier-user/modifier-user.component';
import { ModifierProfileComponent } from './pages/modifier-profile/modifier-profile.component';
import { DetailUserComponent } from './pages/detail-user/detail-user.component';
import { ModifierPasswordComponent } from './pages/modifier-password/modifier-password.component';
import { ModifierPasswordProfileComponent } from './pages/modifier-password-profile/modifier-password-profile.component';

import {MatExpansionModule} from '@angular/material/expansion';
import { ListFormateurComponent } from './pages/list-formateur/list-formateur.component';
import { ListEmployeComponent } from './pages/list-employe/list-employe.component';
import { ListEcoleComponent } from './pages/list-ecole/list-ecole.component';
import { DetailEmployeComponent } from './pages/detail-employe/detail-employe.component';
import { DetailFormateurComponent } from './pages/detail-formateur/detail-formateur.component';
import { DetailEcoleComponent } from './pages/detail-ecole/detail-ecole.component';

@NgModule({
  declarations: [AddUserComponent, ListeUserComponent, ModifierUserComponent, ModifierProfileComponent, DetailUserComponent, ModifierPasswordComponent, ModifierPasswordProfileComponent, ListFormateurComponent, ListEmployeComponent, ListEcoleComponent, DetailEmployeComponent, DetailFormateurComponent, DetailEcoleComponent],
  imports: [
    CommonModule,
    GestionUserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MatTabsModule,
    MatExpansionModule,
    ScheduleModule,
  ]
})
export class GestionUserModule { }
