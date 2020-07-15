import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionFormationRoutingModule } from './gestion-formation-routing.module';
import { AddFormationComponent } from './pages/add-formation/add-formation.component';
import { ListFormationComponent } from './pages/list-formation/list-formation.component';
import { ModifierFormationComponent } from './pages/modifier-formation/modifier-formation.component';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ListFormationEcoleComponent } from './pages/list-formation-ecole/list-formation-ecole.component';

@NgModule({
  declarations: [AddFormationComponent, ListFormationComponent, ModifierFormationComponent, ListFormationEcoleComponent],
  imports: [
    CommonModule,
    GestionFormationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    NgxExtendedPdfViewerModule
  ]
})
export class GestionFormationModule { }
