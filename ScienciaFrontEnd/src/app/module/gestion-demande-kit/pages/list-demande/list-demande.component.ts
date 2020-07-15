import { MatDialog } from '@angular/material/dialog';
import { DiglogSuppressionComponent } from './../../../material/diglog-suppression/diglog-suppression.component';
import { Title } from '@angular/platform-browser';
import { DemandeKit } from './../../../../model/demande-kit';
import { TokenStorageService } from './../../../../services/token-storage.service';
import { DemandeKitService } from './../../service/demande-kit.service';
import { User } from './../../../../model/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-demande',
  templateUrl: './list-demande.component.html',
  styleUrls: ['./list-demande.component.scss']
})
export class ListDemandeComponent implements OnInit {

  searchText = "";
  userConnecte : User;
  demandeKits : DemandeKit[];
  demandeKitsEncours : DemandeKit[];
  
  timeStamp = (new Date()).getTime();

  constructor(private demandeKitService : DemandeKitService,
    private titleService: Title,
    public dialog: MatDialog,
    private tokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
    this.titleService.setTitle("Demande de kits - Sciencia");
    this.userConnecte = this.tokenStorageService.getUser();
    this.getAllDemande();
    this. getDemandeEncours();
  }

  
  getAllDemande() {
    this.demandeKitService.getByIdFormateur(this.userConnecte.id).subscribe((data: DemandeKit[]) => {
      
      this.demandeKits = data;
      console.log("list demande kits ", this.demandeKits);
    });
  }

  
  getDemandeEncours() {
    this.demandeKitService.getByIdFormateurByEtat(this.userConnecte.id,0).subscribe((data: DemandeKit[]) => {
      
      this.demandeKitsEncours = data;
      console.log("list demande  kits en cours ", this.demandeKits);
    });
  }

  
openDialogAnnuler(demande): void {
  const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
    data: {id: demande.id ,title : "Confirmer l'annulation" , subtitle : "Êtes-vous sûr de vouloir annuler cette demande ?",btn_titre :"Confirmer"}
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
   
    if(result){
      this.deleteDemande(demande.id);
    }
  
  });
}

deleteDemande(id) {
  this.demandeKitService.delete(id).subscribe((data: DemandeKit) => {
    console.log("response delete demande",data);
    this.getAllDemande();
    this. getDemandeEncours();
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


}
