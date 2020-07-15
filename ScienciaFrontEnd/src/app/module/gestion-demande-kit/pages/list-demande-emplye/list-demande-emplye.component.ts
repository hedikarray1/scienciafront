import { interval, Subscription } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { NotificationService } from './../../../../services/notification.service';
import { DiglogSuppressionComponent } from './../../../material/diglog-suppression/diglog-suppression.component';
import { DemandeKit } from './../../../../model/demande-kit';
import { User } from './../../../../model/user';
import { DemandeKitService } from './../../service/demande-kit.service';
import { Router } from '@angular/router';
import { TokenStorageService } from './../../../../services/token-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-demande-emplye',
  templateUrl: './list-demande-emplye.component.html',
  styleUrls: ['./list-demande-emplye.component.scss']
})
export class ListDemandeEmplyeComponent implements OnInit {

  searchText = "";
  userConnecte : User;

  demandeKitsAccepter : DemandeKit[];
  demandeKitsRefuser : DemandeKit[];
  demandeKitsEnCours : DemandeKit[];

  subscription: Subscription;

  demandeKitsValider : DemandeKit[];

  timeStamp = (new Date()).getTime();

  constructor(private router : Router,
    private demandeKitService : DemandeKitService,
    private tokenStorageService : TokenStorageService,
    private titleService: Title,
    private notifService : NotificationService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    const source = interval(5000);
    this.subscription = source.subscribe(val => {
      this.getAllDemandeEncours();
      this. getAllDemandeAccepter();
      this.getAllDemandeRefuser();
      this.getAllDemandeValider();
    });
    this.titleService.setTitle("Demande de kits - Sciencia");
    this.userConnecte = this.tokenStorageService.getUser();
  
    this.getAllDemandeEncours();
    this. getAllDemandeAccepter();
    this.getAllDemandeRefuser();
    this.getAllDemandeValider();
  }

  

  
  getAllDemandeEncours() {
    this.demandeKitService.getByEtat(0).subscribe((data: DemandeKit[]) => {
      this.demandeKitsEnCours = data;
      console.log("list demande kits en cours ", this.demandeKitsEnCours);
    });
  }

  
  getAllDemandeAccepter() {
    this.demandeKitService.getByEtatAndIdEmploye(this.userConnecte.id,1).subscribe((data: DemandeKit[]) => {
      this.demandeKitsAccepter = data;
      console.log("list demande kits en cours ", this.demandeKitsAccepter);
    });
  }

  
  getAllDemandeRefuser() {
    this.demandeKitService.getByEtatAndIdEmploye(this.userConnecte.id,-1).subscribe((data: DemandeKit[]) => {
      this.demandeKitsRefuser = data;
      console.log("list demande kits en cours ", this.demandeKitsRefuser);
    });
  }

  
  getAllDemandeValider() {
    this.demandeKitService.getByEtatAndIdEmploye(this.userConnecte.id,2).subscribe((data: DemandeKit[]) => {
      this.demandeKitsValider = data;
      console.log("list demande kits en cours ", this.demandeKitsRefuser);
    });
  }

  
  updateStatus(id,status) {
    
    this.demandeKitService.updateStatus(id,status,this.userConnecte.id).subscribe((data: any[]) => {
      console.log("response update status",data);
      this.getAllDemandeEncours();
      this. getAllDemandeAccepter();
      this.getAllDemandeRefuser();
    });

  }

  
  updateStatusLivraison(id,status) {
    
    this.demandeKitService.updateStatusLivraison(id,status).subscribe((data: any[]) => {
      console.log("response update status livraison",data);
     
      this. getAllDemandeAccepter();
      this.getAllDemandeValider();
    
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


openDialogAccepter(demande): void {
  const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
    data: {id: demande.id ,title : "Confirmer la demande" , subtitle : "Êtes-vous sûr de vouloir accepter cette demande ?",btn_titre :"Accepter"}
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
   
    if(result){
      this.updateStatus(demande.id,1);
      this.sendNotif(demande.id_formateur,"a accepté votre demande de kit")
    }
  
  });
}



openDialogValider(demande): void {
  const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
    data: {id: demande.id ,title : "Confirmer la livraison" , subtitle : "Êtes-vous sûr de vouloir valider cette demande ?",btn_titre :"Valider"}
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
   
    if(result){
      this.updateStatusLivraison(demande.id,1);
     
    }
  
  });
}


openDialogInValider(demande): void {
  const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
    data: {id: demande.id ,title : "Annulation de  la livraison" , subtitle : "Êtes-vous sûr de vouloir annuler cette demande ?",btn_titre :"Annuler la livraison"}
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
   
    if(result){
      this.updateStatusLivraison(demande.id,-1);
     
    }
  
  });
}



openDialogRefuser(demande): void {
  const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
    data: {id: demande.id ,title : "Refuser la demande" , subtitle : "Êtes-vous sûr de vouloir refuser cette demande ?",btn_titre :"Refuser"}
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
   
    if(result){
      this.updateStatus(demande.id,-1);
    this.sendNotif(demande.id_formateur,"a refusé votre demande de kit")
    }
  
  });
}


sendNotif(recepteur,msg) {

  let notif = {
    
      id_sender: this.userConnecte.id ,
      id_recepteur: recepteur ,
      titre: msg ,               
      redirection:  "gestionDemendeKit/listDemande",
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
