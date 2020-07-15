import { UserService } from './../../../../services/user.service';
import { Title } from '@angular/platform-browser';
import { NotificationService } from './../../../../services/notification.service';
import { User } from './../../../../model/user';
import { DemandeKitService } from './../../service/demande-kit.service';
import { TokenStorageService } from './../../../../services/token-storage.service';
import { DialogPanierComponent } from './../../../material/dialog-panier/dialog-panier.component';
import { KitDemander } from './../../../../model/kit-demander';
import { DialogDemandeKitComponent } from './../../../material/dialog-demande-kit/dialog-demande-kit.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { StockService } from './../../../gestion-stock/service/stock.service';
import { Stock } from './../../../../model/stock';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-kit',
  templateUrl: './list-kit.component.html',
  styleUrls: ['./list-kit.component.scss']
})
export class ListKitComponent implements OnInit {

  stocks : Stock[];
  searchText = "";
  kitsDemander :Array<KitDemander> = [];
  userConnecte : User;


  constructor(private demandeKitService : DemandeKitService,
    private stockService : StockService ,
    private notifService : NotificationService,
    private titleService: Title,
    private userService : UserService,
    private tokenStorageService : TokenStorageService,private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.titleService.setTitle("Demande de kits - Sciencia");
    this.userConnecte = this.tokenStorageService.getUser();
    if (this.tokenStorageService.getPanierDemandeKit()){
      this.kitsDemander = this.tokenStorageService.getPanierDemandeKit();
    }
    this.getAllStock();
  
  }

  
  getAllStock() {
    this.stockService.getAll().subscribe((data: Stock[]) => {
      console.log(data);
      this.stocks = data;
    });
  }



  

  openDialog(stock): void {


    const dialogRef = this.dialog.open(DialogDemandeKitComponent, {
      data: {stock : stock ,quantite : this.findKitInList(stock) }
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log("resultat", result);
     
      if(result){
        this.setKitDemander(stock,result);
    
      }
    
    });
  }

  setKitDemander(stock,quantite){
    for (let kit of this.kitsDemander){
      if(kit.id_kit == stock.id){
        kit.quantite = quantite;
        this.tokenStorageService.savePanierDemandeKit(this.kitsDemander) ;
        console.log("kits demander", this.kitsDemander);
        return 
      }
    }
    let kit  ={
      id_kit:  stock.id ,
      quantite:  quantite ,
      id:   null,
      id_demande:  null,
      demande : null,
      kit : stock,
    }
    this.kitsDemander.push(kit) ;
    this.tokenStorageService.savePanierDemandeKit(this.kitsDemander) ;
    console.log("kits demander", this.kitsDemander);
  }

  
  findKitInList(stock) : number{
    if ( this.kitsDemander.length > 0){
    for (let kit of this.kitsDemander){
      if(kit.id_kit == stock.id){
        return   kit.quantite ;
      }
    }
  }
   return 0 ;
  }

  openDialogPanier(){
    const dialogRef = this.dialog.open(DialogPanierComponent, {
      data: { }
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log("resultat", result);
      this.kitsDemander = this.tokenStorageService.getPanierDemandeKit();
      console.log("kits demander", this.kitsDemander);
      if(result){
        console.log("add panier a la base");
    this.adddPanier();
      }
    
    });
  }

  
  calculPrixDemande() : number{
 let prix : number =0
    for (let kit of this.kitsDemander){
     prix = prix +( kit.kit.prix * kit.quantite) ;
    }
   return prix ;
  }


  adddPanier() {

    let demande = {
        id_formateur: this.userConnecte.id,
        etat: 0,
        date_demande: Date(),
        kits : this.kitsDemander,
        id_employe : 0,
        etat_livraison : 0,
        prix : this.calculPrixDemande()
    }
  
    this.demandeKitService.create(demande).subscribe(
      data => {
        console.log(data);
        this.kitsDemander  = [];
        this.tokenStorageService.savePanierDemandeKit(this.kitsDemander) ;
console.log("start sending notif");
    
    this.sendNotif();
        this.goToListDemande();
      },
      err => {

      }
    );
  }

  
 public goToListDemande() {
  this.router.navigate(['gestionDemendeKit/listDemande']);
}


  
 async sendNotif() {

    let notif = {
      
        id_sender: this.userConnecte.id ,
        titre: "a envoyé une demande de kit " ,               
        redirection:  "gestionDemendeEmploye",
        date: Date() ,
        status: 0 
    }
  
  await  this.notifService.createNotifToAllEmploye(notif).subscribe(
      data => {
        console.log(data);
      }
    );
  }

}
