import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DiglogSuppressionComponent } from './diglog-suppression/diglog-suppression.component';
import { DialogFeedbackComponent } from './dialog-feedback/dialog-feedback.component';
import { DialogModifierImageProfilComponent } from './dialog-modifier-image-profil/dialog-modifier-image-profil.component';
import { DialogDemandeKitComponent } from './dialog-demande-kit/dialog-demande-kit.component';

import {MatSliderModule} from '@angular/material/slider';
import { DialogPanierComponent } from './dialog-panier/dialog-panier.component';
import { DialogValiderFormationComponent } from './dialog-valider-formation/dialog-valider-formation.component';
import { DialogDetailUserComponent } from './dialog-detail-user/dialog-detail-user.component';
import { DialogModifierImageStockComponent } from './dialog-modifier-image-stock/dialog-modifier-image-stock.component';



@NgModule({
  declarations: [DiglogSuppressionComponent, DialogFeedbackComponent, DialogModifierImageProfilComponent, DialogDemandeKitComponent, DialogPanierComponent, DialogValiderFormationComponent, DialogDetailUserComponent, DialogModifierImageStockComponent],
  imports: [
    CommonModule,
    FormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatButtonModule, 
    MatInputModule,
    ReactiveFormsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSliderModule,
  ],
  exports: [
    FormsModule, 
    MatDialogModule, 
    MatFormFieldModule,
     MatButtonModule,
      MatInputModule
    ],
    entryComponents: [
      DiglogSuppressionComponent,
      DialogModifierImageProfilComponent ,
       DialogFeedbackComponent,
       DialogDemandeKitComponent,
       DialogPanierComponent,
       DialogValiderFormationComponent,
       DialogDetailUserComponent,
       DialogModifierImageStockComponent
      ]
})
export class MaterialModule { }
