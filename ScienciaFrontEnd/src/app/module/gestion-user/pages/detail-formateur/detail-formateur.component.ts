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
  selector: 'app-detail-formateur',
  templateUrl: './detail-formateur.component.html',
  styleUrls: ['./detail-formateur.component.scss']
})
export class DetailFormateurComponent implements OnInit {

  user : User ;

  timeStamp = (new Date()).getTime();

  emploiEtat :Boolean = false ;
 
  demandeKitEtat :Boolean = false ;
  

  

  public views : String[] =['Day' ,'Week' ,'Month' ,'Agenda']

   public currentView: View = 'Agenda';
   public selectedDate: Date = new Date();
   public isReadOnly: number = 3;
 
   public allowVirtualScroll: boolean = true;
  
  public eventSettings: EventSettingsModel ;

  reservationsEcole: Reservation[];

  demandeKits : DemandeKit[];



  constructor(private route: ActivatedRoute ,
    private titleService: Title,
              private userService : UserService ,
              private reservationService : ReservationService,
              private demandeKitService : DemandeKitService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.titleService.setTitle("D??tail Utilisateur - Sciencia");
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
    
      this.getAllActiviteFormateur();
      this.showEmploi()
       this.getAllDemandeFormateur() ;
    
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
      data: {id: id ,title : "Confirmer la suppression" , subtitle : "??tes-vous s??r de vouloir supprimer cet utilisateur ?",btn_titre :"Supprimer"}
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
      data: {id: id ,title : "Confirmer la d??sactivation" , subtitle : "??tes-vous s??r de vouloir d??sactiver cet utilisateur ?",btn_titre :"D??sactiver"}
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
      data: {id: id ,title : "Confirmer l'activation" , subtitle : "??tes-vous s??r de vouloir activer cet utilisateur ?",btn_titre :"Activer"}
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
  this.router.navigate(['gestionUser/listeFormateur']);
}




showEmploi(){
 
  this.demandeKitEtat = false;
  this.emploiEtat = true;

}



showDemandeKit(){
  
  this.demandeKitEtat = true;
  this.emploiEtat = false;
  
}



}
