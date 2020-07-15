import { FeedBackService } from './../../gestion-feed-back/services/feed-back.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Rating } from './../../../model/rating';
import { RatingService } from './../../gestion-reservation/service/rating.service';
import { Reservation } from './../../../model/reservation';
import { DiglogSuppressionComponent } from './../diglog-suppression/diglog-suppression.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';



interface DialogData {
  reservation: Reservation;
}

@Component({
  selector: 'app-dialog-feedback',
  templateUrl: './dialog-feedback.component.html',
  styleUrls: ['./dialog-feedback.component.scss']
})
export class DialogFeedbackComponent implements OnInit {

  public msg: String = "";
  currentRate = 0 ;
  feedBackForm : FormGroup ;

  constructor( public fb: FormBuilder ,private ratingService : RatingService,public feedBackService: FeedBackService, public dialogRef: MatDialogRef<DiglogSuppressionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.getRating() ;
    this.feedBackForm = this.fb.group({
      message:  ['' , Validators.required],   
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }

  onYesClick(): void {
    let feedBack = {
      message: this.feedBackForm.value.message,
      date: new Date,
      id_ecole: this.data.reservation.id_ecole,
      id_reservation_formation: this.data.reservation.id
    }

    this.feedBackService.create(feedBack).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close();
      },
      err => {
        this.dialogRef.close();
      }
    );
    
  }

  getRating(){
    this.ratingService.getRatingFormateurEcole(this.data.reservation.id_ecole,this.data.reservation.id_formateur).subscribe(
      data => {
        console.log(data);
        this.currentRate = data.rating ;
      },
      err => {
      }
    );
  }
  
  ratingChanged(nbr){
    console.log("rating ",nbr);
    console.log("rating current ",this.currentRate);
 let  r : Rating ;
 r ={
   id : 0,
   id_ecole : this.data.reservation.id_ecole ,
   id_formateur : this.data.reservation.id_formateur,
   nbr_star : nbr ,
   date : new Date()
 }
    console.log("new rating  : ",r);
    this.ratingService.createORupdate(r).subscribe(
      data => {
        console.log(data);
      },
      err => {

      }
    );

  }
  

}
