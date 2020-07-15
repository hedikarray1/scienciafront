import { Reservation } from './../../../../model/reservation';
import { DemandeKitService } from './../../../gestion-demande-kit/service/demande-kit.service';
import { DemandeKit } from './../../../../model/demande-kit';
import { ReservationService } from './../../../gestion-reservation/service/reservation.service';
import { View, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { Title } from '@angular/platform-browser';
import { DiglogSuppressionComponent } from './../../../material/diglog-suppression/diglog-suppression.component';
import { DialogModifierImageProfilComponent } from './../../../material/dialog-modifier-image-profil/dialog-modifier-image-profil.component';
import { MatDialog } from '@angular/material/dialog';
import { User } from './../../../../model/user';
import { UserService } from './../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {

  user : User ;

  timeStamp = (new Date()).getTime();

  emploiEtat :Boolean = false ;
  reservationEtat :Boolean = false ;
  demandeKitEtat :Boolean = false ;
  factureEtat :Boolean = false ;
  feedbackEtat :Boolean = false ;
  demandeKitEmployeEtat :Boolean = false ;
  historiqueStockEtat :Boolean = false ;

  

  public views : String[] =['Day' ,'Week' ,'Month' ,'Agenda']

   public currentView: View = 'Agenda';
   public selectedDate: Date = new Date();
   public isReadOnly: number = 3;
 
   public allowVirtualScroll: boolean = true;
  
  public eventSettings: EventSettingsModel ;

  reservationsEcole: Reservation[];

  demandeKits : DemandeKit[];

  isAdmin : boolean =false ;

  constructor(private route: ActivatedRoute ,
    private titleService: Title,
              private userService : UserService ,
              private reservationService : ReservationService,
              private demandeKitService : DemandeKitService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.titleService.setTitle("Détail Utilisateur - Sciencia");
    this.getUser( this.route.snapshot.paramMap.get('id')) ;

  
  }

   
  getUser(id) {
    this.userService.getById(id).subscribe((data: User) => {
      console.log("response get user by id",data);
      this.user = data;
      this.setUpEnvirement();
    });
  }

  setUpEnvirement(){
    if (this.user.role == 'Formateur'){
      this.getAllActiviteFormateur();
      this.showEmploi()
       this.getAllDemandeFormateur() ;
    }
    if (this.user.role == 'Ecole'){
      this.getReservationEcole();
      this.showReservation();
    }
    if (this.user.role == 'Employé'){
      this.showDemandeKitEmploye();
      
    }
    if (this.user.role == 'Admin'){
      this.isAdmin = true ;
    }
  }

  
  getAllActiviteFormateur() {

    this.reservationService.getActiviteFormateur(this.user.id).subscribe((data: any[]) => {
      console.log(data);
      
      this.eventSettings  = {
        dataSource: data 
      }
      console.log("event setting", this.eventSettings);
    });


  }

  
 async getReservationEcole() {
  console.log("start getAllReservation")
  await  this.reservationService.getByEcoleId(this.user.id).subscribe((data: Reservation[]) => {
      console.log("getReservation ecole",data);
      this.reservationsEcole = data; 
      
    });
  }

  getAllDemandeFormateur() {
    this.demandeKitService.getByIdFormateur(this.user.id).subscribe((data: DemandeKit[]) => {
      
      this.demandeKits = data;
      console.log("list demande kits ", this.demandeKits);
    });
  }

  gotoModifierUser(id){
    this.router.navigate(['gestionUser/modifierUser',id]);
  }

  gotoModifierPasswordUser(id){
    this.router.navigate(['gestionUser/modifierPasswordUser',id]);
  }


  changeSource(event) { 
    event.target.src = "../../../../../assets/profile photo.png";
   }


   
  openDialogUpload(): void {
    console.log("open dialog modifier image") ;
    const dialogRef = this.dialog.open(DialogModifierImageProfilComponent, {
      data: {id: this.user.id }
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log("resultat", result);
     
      this.user.photo = "photo_profile_"+this.user.id+".png";
    
     this.setLinkPicture();
      
      
    });
  }


  openDialogSupprimer(id): void {
    const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
      data: {id: id ,title : "Confirmer la suppression" , subtitle : "Êtes-vous sûr de vouloir supprimer cet utilisateur ?",btn_titre :"Supprimer"}
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log("resultat", result);
     
      if(result){
        this.deleteUser(id)
      }
    
    });
  }

  
  openDialogBloquer(id): void {
    const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
      data: {id: id ,title : "Confirmer la désactivation" , subtitle : "Êtes-vous sûr de vouloir désactiver cet utilisateur ?",btn_titre :"Désactiver"}
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log("resultat", result);
     
      if(result){
      this.bloquerUser(id);
      }
    
    });
  }

  openDialogDebloquer(id): void {
    const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
      data: {id: id ,title : "Confirmer l'activation" , subtitle : "Êtes-vous sûr de vouloir activer cet utilisateur ?",btn_titre :"Activer"}
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log("resultat", result);
     
      if(result){
      this.debloquerUser(id);
      }
    
    });
  }


  deleteUser(id){

    
    console.log(id);
    
    this.userService.delete(id).subscribe(
      data => {
        console.log(data);
      this.goToListUser();
      },
      err => {

      }
    );
  }

  bloquerUser(id){

    console.log("delete star ");
    console.log(id);
    
    this.userService.bloquerUser(id).subscribe(
      data => {
        console.log(data);
        this.user.etat = "desactive" ;
      },
      err => {

      }
    );
  }

  debloquerUser(id){

    console.log("delete star ");
    console.log(id);
    
    this.userService.debloquerUser(id).subscribe(
      data => {
        console.log(data);
        this.user.etat = "active" ;
      },
      err => {

      }
    );
  }

  
public getLinkPictureReservation(imagename) {
  if(this.timeStamp) {
     return "http://localhost:3000/image_user/" + imagename + '?' + this.timeStamp;
  }
return "http://localhost:3000/image_user/" +  imagename;
}

  public getLinkPicture() {
    if(this.timeStamp) {
       return "http://localhost:3000/image_user/" + this.user.photo + '?' + this.timeStamp;
    }
  return "http://localhost:3000/image_user/" +  this.user.photo;
}

public setLinkPicture() {
 
  this.timeStamp = (new Date()).getTime();
}
  
 public goToListUser() {
  this.router.navigate(['gestionUser/listeUser']);
}

showReservation(){
  this.reservationEtat = true ;
  this.demandeKitEmployeEtat = false;
  this.demandeKitEtat = false;
  this.emploiEtat = false;
  this.factureEtat = false ;
  this.feedbackEtat = false ;
  this.historiqueStockEtat = false ;
}


showEmploi(){
  this.reservationEtat = false ;
  this.demandeKitEmployeEtat = false;
  this.demandeKitEtat = false;
  this.emploiEtat = true;
  this.factureEtat = false ;
  this.feedbackEtat = false ;
  this.historiqueStockEtat = false ;
}


showFeedback(){
  this.reservationEtat = false ;
  this.demandeKitEmployeEtat = false;
  this.demandeKitEtat = false;
  this.emploiEtat = false;
  this.factureEtat = false ;
  this.feedbackEtat = true ;
  this.historiqueStockEtat = false ;
}


showFacture(){
  this.reservationEtat = false ;
  this.demandeKitEmployeEtat = false;
  this.demandeKitEtat = false;
  this.emploiEtat = false;
  this.factureEtat = true ;
  this.feedbackEtat = false ;
  this.historiqueStockEtat = false ;
}


showDemandeKit(){
  this.reservationEtat = false ;
  this.demandeKitEmployeEtat = false;
  this.demandeKitEtat = true;
  this.emploiEtat = false;
  this.factureEtat = false ;
  this.feedbackEtat = false ;
  this.historiqueStockEtat = false ;
}


showDemandeKitEmploye(){
  this.reservationEtat = false ;
  this.demandeKitEmployeEtat = true;
  this.demandeKitEtat = false;
  this.emploiEtat = false;
  this.factureEtat = false ;
  this.feedbackEtat = false ;
  this.historiqueStockEtat = false ;
}


showHistoriqueStock(){
  this.reservationEtat = false ;
  this.demandeKitEmployeEtat = false;
  this.demandeKitEtat = false;
  this.emploiEtat = false;
  this.factureEtat = false ;
  this.feedbackEtat = false ;
  this.historiqueStockEtat = true ;
}

}
