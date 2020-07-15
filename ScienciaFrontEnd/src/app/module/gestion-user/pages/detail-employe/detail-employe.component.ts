import { DiglogSuppressionComponent } from './../../../material/diglog-suppression/diglog-suppression.component';
import { DialogModifierImageProfilComponent } from './../../../material/dialog-modifier-image-profil/dialog-modifier-image-profil.component';
import { MatDialog } from '@angular/material/dialog';
import { DemandeKitService } from './../../../gestion-demande-kit/service/demande-kit.service';
import { ReservationService } from './../../../gestion-reservation/service/reservation.service';
import { UserService } from './../../../../services/user.service';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DemandeKit } from './../../../../model/demande-kit';
import { Reservation } from './../../../../model/reservation';
import { View, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { User } from './../../../../model/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-employe',
  templateUrl: './detail-employe.component.html',
  styleUrls: ['./detail-employe.component.scss']
})
export class DetailEmployeComponent implements OnInit {

  user : User ;

  timeStamp = (new Date()).getTime();

  
  demandeKitEmployeEtat :Boolean = false ;
  historiqueStockEtat :Boolean = false ;


  constructor(private route: ActivatedRoute ,
    private titleService: Title,
              private userService : UserService ,
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
  
      this.showDemandeKitEmploye();
      
    
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
  this.router.navigate(['gestionUser/listeEmploye']);
}




showDemandeKitEmploye(){
 
  this.demandeKitEmployeEtat = true;

  this.historiqueStockEtat = false ;
}


showHistoriqueStock(){
 
  this.demandeKitEmployeEtat = false;
  
  this.historiqueStockEtat = true ;
}

}
