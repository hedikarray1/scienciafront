import { DialogDetailUserComponent } from './../../material/dialog-detail-user/dialog-detail-user.component';
import { Title } from '@angular/platform-browser';
import { View } from '@syncfusion/ej2-angular-schedule';
import { RatingService } from './../service/rating.service';

import { DialogFeedbackComponent } from './../../material/dialog-feedback/dialog-feedback.component';
import { MatDialog } from '@angular/material/dialog';
import { ReservationService } from './../service/reservation.service';
import { User } from './../../../model/user';
import { TokenStorageService } from './../../../services/token-storage.service';
import { Reservation } from './../../../model/reservation';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Rat } from 'src/app/model/rat';

@Component({
  selector: 'app-liste-reservation',
  templateUrl: './liste-reservation.component.html',
  styleUrls: ['./liste-reservation.component.scss']
})
export class ListeReservationComponent implements OnInit {

  currentRate = 3.95

  searchText ="";

  timeStamp = (new Date()).getTime();
  
  ratingsFormateur : Rat[];
  reservationsTermine : Reservation[];
  reservationsEncours : Reservation[];
  reservationsAccepter : Reservation[];
  reservationsRefuser : Reservation[];
  userConnecte : User;


  public views : String[] =['Month']

   public currentView: View = 'Month';
   public selectedDate: Date = new Date();
   public isReadOnly: number = 3;
 
   public allowVirtualScroll: boolean = false;
  

  constructor(private router : Router,
              private tokenStorageService : TokenStorageService,
              private reservationService : ReservationService ,
              private titleService: Title, 
              public dialog: MatDialog) { 
                
              }

  ngOnInit(): void {
    this.titleService.setTitle("Mes réservations - Sciencia");
    this.userConnecte = this.tokenStorageService.getUser();
  
    this.getReservationTermine();
    this.getReservationAccepter();
    this.getReservationEncours();
    this.getReservationRefuser();
 //   this. getRatingFormateur();
  }

 
  
  
 
 async getReservationTermine() {
  console.log("start getAllReservation")
  await  this.reservationService.getByEcoleIdAndStatus(this.userConnecte.id,2).subscribe((data: Reservation[]) => {
      console.log("getReservationTermine",data);
      this.reservationsTermine = data; 
      
    });
  }

  
 async getReservationEncours() {
  console.log("start getAllReservation")
  await  this.reservationService.getByEcoleIdAndStatus(this.userConnecte.id,0).subscribe((data: Reservation[]) => {
      console.log("getReservationEncours",data);
      this.reservationsEncours = data; 
      
    });
  }

  
 async getReservationAccepter() {
  console.log("start getAllReservation")
  await  this.reservationService.getByEcoleIdAndStatus(this.userConnecte.id,1).subscribe((data: Reservation[]) => {
      console.log("getReservationAccepter",data);
      this.reservationsAccepter = data; 
      
    });
  }

   
 async getReservationRefuser() {

  console.log("start getAllReservation")
  await  this.reservationService.getByEcoleIdAndStatus(this.userConnecte.id,-1).subscribe((data: Reservation[]) => {
      console.log("getReservationRefuser",data);
      this.reservationsRefuser = data; 
      
    });
  }

  /*

 async getRatingFormateur(){
   console.log("start rating formateur")

    for (let r of this.reservations){
  await  this.ratingService.getRatingFormateur(r.id_formateur).subscribe(
      data => {
        console.log(data);
        this.ratingsFormateur.push(data);
      },
      err => {
      }
    );
    }
    console.log("ratings formateur ",this.ratingsFormateur);
  }

  getRating(id)  {
 
    for (let r of this.ratingsFormateur){
         if (r.id_formateur == id){
           return r 
         }
        }
    
   }
  
*/

  gotoAddReservation() {
    this.router.navigate(['gestionReservation/addReservation']);
  }

  
openDialog(rendez : Reservation): void {
  const dialogRef = this.dialog.open(DialogFeedbackComponent, {
    data: {reservation : rendez}
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
    if(result){
        
    }
  });
}


public getLinkPicture(imagename) {
  if(this.timeStamp) {
     return "http://localhost:3000/image_user/" + imagename + '?' + this.timeStamp;
  }
return "http://localhost:3000/image_user/" +  imagename;
}
changeSource(event) { 
event.target.src = "../../../../../assets/profile photo.png";
}


openDialogDetailUser(res): void {
  const dialogRef = this.dialog.open(DialogDetailUserComponent, {
    data: {id: res.id}
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
   
    if(result){
   
    }
  
  });
}


}
