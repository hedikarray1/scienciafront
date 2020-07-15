import { DialogModifierImageStockComponent } from './../../../material/dialog-modifier-image-stock/dialog-modifier-image-stock.component';
import { Title } from '@angular/platform-browser';
import { DiglogSuppressionComponent } from './../../../material/diglog-suppression/diglog-suppression.component';
import { Router, NavigationEnd } from '@angular/router';
import { Stock } from './../../../../model/stock';
import { StockService } from './../../service/stock.service';
import { Component, OnInit } from '@angular/core';

import {  MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './list-stock.component.html',
  styleUrls: ['./list-stock.component.scss']
})
export class ListStockComponent implements OnInit {

  stocks : Stock[];
  searchText ="";

  mySubscription: any;

  timeStamp = (new Date()).getTime();
  constructor(private stockService : StockService ,private titleService: Title ,private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.titleService.setTitle("Gestion de stock - Sciencia");
    this.getAllStock();
  }

  
  getAllStock() {
    this.stockService.getAll().subscribe((data: Stock[]) => {
      console.log(data);
      this.stocks = data;
    });
  }





  deleteStock(id){

    console.log("delete star ");
    console.log(id);
    
    this.stockService.delete(id).subscribe(
      data => {
        console.log(data);
        this.getAllStock() ;
      },
      err => {

      }
    );
  }
  

 public goToAddStock() {
    this.router.navigate(['gestionStock/addStock']);
  }

  
 public goToModifierStock(id) {
  this.router.navigate(['gestionStock/modifierStock',id]);
}

  

  openDialog(id): void {
    const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
      data: {id: id  ,title : "Confirmer la suppression" , subtitle :"Êtes-vous sûr de vouloir supprimer ce Kit ?",btn_titre :"Supprimer"}
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log("resultat", result);
     
      if(result){
        this.deleteStock(id)
      }
    
    });
  }


  changeSource(event) { 
    event.target.src = "../../../../../assets/icon-stock-default.svg";
   }

   public getLinkPicture(photo) {
    if(this.timeStamp) {
       return "http://localhost:3000/image_stock/" + photo + '?' + this.timeStamp;
    }
  return "http://localhost:3000/image_stock/" +  photo;
}


public setLinkPicture() {
 
  this.timeStamp = (new Date()).getTime();
}

openDialogModifierImage(id): void {
  console.log("open dialog modifier image") ;
  const dialogRef = this.dialog.open(DialogModifierImageStockComponent, {
    data: {id: id }
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
    
    this.getAllStock();
    this.setLinkPicture() ;
  
  });
}

}
