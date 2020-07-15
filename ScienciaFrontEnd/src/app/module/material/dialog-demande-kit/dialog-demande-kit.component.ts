import { Stock } from './../../../model/stock';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { dataBinding } from '@syncfusion/ej2-angular-schedule';


interface DialogData {
  stock: Stock;
  quantite : number ;
}

@Component({
  selector: 'app-dialog-demande-kit',
  templateUrl: './dialog-demande-kit.component.html',
  styleUrls: ['./dialog-demande-kit.component.scss']
})
export class DialogDemandeKitComponent implements OnInit {

  min = 0;
  max = this.data.stock.quantite ;
  value = this.data.quantite ;
  thumbLabel = true;
  tickInterval = this.data.stock.quantite/10;


  constructor(
    public dialogRef: MatDialogRef<DialogDemandeKitComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  
  ngOnInit() {
  }

}
