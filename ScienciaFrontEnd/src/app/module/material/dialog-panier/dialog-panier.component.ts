import { TokenStorageService } from './../../../services/token-storage.service';
import { KitDemander } from './../../../model/kit-demander';
import { Stock } from './../../../model/stock';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';



interface DialogData {

}

@Component({
  selector: 'app-dialog-panier',
  templateUrl: './dialog-panier.component.html',
  styleUrls: ['./dialog-panier.component.scss']
})
export class DialogPanierComponent implements OnInit {

  kitsDemander :Array<KitDemander> = [];


  constructor(
    private tokenStorageService : TokenStorageService,
    public dialogRef: MatDialogRef<DialogPanierComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  ngOnInit() {
    if (this.tokenStorageService.getPanierDemandeKit()){
      this.kitsDemander = this.tokenStorageService.getPanierDemandeKit();
    }
  }

  deleteKitPanier(id){
    let i =0 ;
    for (let kit of this.kitsDemander){
      if (kit.id_kit == id){
        this.kitsDemander.splice(i,1);
        this.tokenStorageService.savePanierDemandeKit(this.kitsDemander) ;
        i++ ;
      }
    }

    console.log("panier after delete",this.kitsDemander);
  }

}
