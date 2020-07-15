import { DialogDetailUserComponent } from './../../material/dialog-detail-user/dialog-detail-user.component';
import { DialogValiderFormationComponent } from './../../material/dialog-valider-formation/dialog-valider-formation.component';
import { Title } from '@angular/platform-browser';
import { NotificationService } from './../../../services/notification.service';
import { DiglogSuppressionComponent } from './../../material/diglog-suppression/diglog-suppression.component';
import { User } from './../../../model/user';
import { View } from '@syncfusion/ej2-angular-schedule';
import { RatingService } from './../service/rating.service';
import { ReservationService } from './../service/reservation.service';
import { TokenStorageService } from './../../../services/token-storage.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { Reservation } from './../../../model/reservation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-reservation-formateur',
  templateUrl: './list-reservation-formateur.component.html',
  styleUrls: ['./list-reservation-formateur.component.scss']
})
export class ListReservationFormateurComponent implements OnInit {

 
  searchText ="";
  
  timeStamp = (new Date()).getTime();

  reservationsEncours : Reservation[];
  reservationsHistoriqueAcceptrer : Reservation[];
  reservationsHistoriqueRefuser : Reservation[];
  reservationsValider : Reservation[];

  selectedTab = 0 ;

  userConnecte : User;


  public views : String[] =['Month']

   public currentView: View = 'Month';
   public selectedDate: Date = new Date();
   public isReadOnly: number = 3;
 
   public allowVirtualScroll: boolean = false;
  

  constructor(private router : Router,
              private tokenStorageService : TokenStorageService,
              private notifService : NotificationService,
              private reservationService : ReservationService ,
              private ratingService : RatingService,
              private titleService: Title, 
              public dialog: MatDialog) { 
                
              }

  ngOnInit(): void {
    this.titleService.setTitle("Demandes de réservation - Sciencia");
    this.userConnecte = this.tokenStorageService.getUser();
  
    this.getReservationEncours();
    this. getReservationAccepter();
    this.getReservationRefuser();
    this.getReservationValider();
  }

 
  
  
 
 async getReservationEncours() {

  console.log("start getAllReservation")
  await  this.reservationService.getDemandeActiviteFormateur(this.userConnecte.id).subscribe((data: Reservation[]) => {
      console.log("getReservationEncours",data);
      this.reservationsEncours = data; 
      
    });
  }

  
 async getReservationAccepter() {

  console.log("start getAllReservation")
  await  this.reservationService.getHistoriqueDemandeFormateur(this.userConnecte.id,1).subscribe((data: Reservation[]) => {
      console.log("getHistoriqueReservation",data);
      this.reservationsHistoriqueAcceptrer = data; 
      
    });
  }

  
  
 async getReservationValider() {

  await  this.reservationService.getFormationFormateurValider(this.userConnecte.id,1).subscribe((data: Reservation[]) => {
      console.log("getReservationValider",data);
      this.reservationsValider = data; 
      
    });
  }

  
 async getReservationRefuser() {

  console.log("start getAllReservation")
  await  this.reservationService.getHistoriqueDemandeFormateur(this.userConnecte.id,-1).subscribe((data: Reservation[]) => {
      console.log("getHistoriqueReservation",data);
      this.reservationsHistoriqueRefuser = data; 
      
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

 AccepterReservation(id){
  this.reservationService.updateStatus(id , 1).subscribe((data: any) => {
    console.log("response update Status",data);
    this.getReservationEncours();
    this. getReservationAccepter();
    this.getReservationRefuser();
    this.selectedTab = 1;
  });
 }

 
 RefuserReservation(id){
  this.reservationService.updateStatus(id , -1).subscribe((data: any) => {
    console.log("response update Status",data);
    this.getReservationEncours();
    this. getReservationAccepter();
    this.getReservationRefuser();
    this.selectedTab = 2;
  });
 }


 
 invaliderFormation(id){
  this.reservationService.updateStatusValidation(id , -1).subscribe((data: any) => {
    console.log("response update Status validation",data);
    this. getReservationAccepter();
    this.getReservationValider();
    this.selectedTab = 3;
  });
 }
 
 openDialogAccepter(res): void {

  const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
    data: {id: res.id ,title : "Confirmer la réservation" , subtitle : "Êtes-vous sûr de vouloir accepter cet réservation ?",btn_titre :"Accepter"}
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
   
    if(result){
      this.AccepterReservation(res.id)
      this.sendNotif(res.id_ecole,"a accepté votre reservation");
    }
  
  });

}

openDialogRefuser(res): void {
  const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
    data: {id: res.id ,title : "Refuser la réservation" , subtitle : "Êtes-vous sûr de vouloir refuser cet réservation ?",btn_titre :"Refuser"}
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
   
    if(result){
      this.RefuserReservation(res.id)
      this.sendNotif(res.id_ecole,"a refusé votre reservation");
    }
  
  });
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


openDialogNonValider(res): void {
  const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
    data: {id: res.id ,title : "Invalidation la formation" , subtitle : "Êtes-vous sûr de vouloir invalider cette formation ?",btn_titre :"invalidation"}
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
   
    if(result){
     this.invaliderFormation(res.id) ;
     this.selectedTab = 3;
    }
  
  });
}


openDialogValider(res): void {
  const dialogRef = this.dialog.open(DialogValiderFormationComponent, {
    data: {reservation : res }
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
    this.selectedTab = 3;
   
      this. getReservationAccepter();
      this.getReservationValider();
  
  
  });
}

sendNotif(recepteur,msg) {

  let notif = {
    
      id_sender: this.userConnecte.id ,
      id_recepteur: recepteur ,
      titre: msg ,               
      redirection:  "gestionReservation/listeReservation",
      date: Date() ,
      status: 0
  }

  this.notifService.create(notif).subscribe(
    data => {
      console.log(data);
    }
  );

}
  
}
