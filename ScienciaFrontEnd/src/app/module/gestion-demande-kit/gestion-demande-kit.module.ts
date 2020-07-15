import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionDemandeKitRoutingModule } from './gestion-demande-kit-routing.module';
import { ListKitComponent } from './pages/list-kit/list-kit.component';
import { ListDemandeComponent } from './pages/list-demande/list-demande.component';

import {MatBadgeModule} from '@angular/material/badge';
import { ListDemandeEmplyeComponent } from './pages/list-demande-emplye/list-demande-emplye.component';

import {MatTabsModule} from '@angular/material/tabs';

@NgModule({
  declarations: [ListKitComponent, ListDemandeComponent, ListDemandeEmplyeComponent],
  imports: [
    CommonModule,
    GestionDemandeKitRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MatBadgeModule,
    MatTabsModule
  ]
})
export class GestionDemandeKitModule { }
