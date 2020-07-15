import { ReservationService } from './../../gestion-reservation/service/reservation.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Reservation } from './../../../model/reservation';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';



interface DialogData {
  reservation : Reservation ;
}

@Component({
  selector: 'app-dialog-valider-formation',
  templateUrl: './dialog-valider-formation.component.html',
  styleUrls: ['./dialog-valider-formation.component.scss']
})
export class DialogValiderFormationComponent implements OnInit {

  validationForm : FormGroup ;

  constructor(public fb: FormBuilder,
    private reservationService: ReservationService,
    public dialogRef: MatDialogRef<DialogValiderFormationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.validationForm = this.fb.group({
      nbr_enfants: ['', Validators.required],
    });
  }

  
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onYesClick(): void {
    let formation = {
      id: this.data.reservation.id,
      status_validation: 1,
      nbr_enfants: this.validationForm.value.nbr_enfants    
    }
 console.log("valider formation params ",formation) ;
    this.reservationService.updateReservationValidation(formation).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close();
      },
      err => {
        this.dialogRef.close();
      }
    );
    
  }

}
