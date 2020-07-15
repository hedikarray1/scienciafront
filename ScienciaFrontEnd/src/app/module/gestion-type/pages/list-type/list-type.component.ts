import { DiglogSuppressionComponent } from './../../../material/diglog-suppression/diglog-suppression.component';
import { Type } from './../../../../model/type';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { TypeService } from './../../services/type.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-type',
  templateUrl: './list-type.component.html',
  styleUrls: ['./list-type.component.scss']
})
export class ListTypeComponent implements OnInit {

  types : Type[];

  searchText ="";

  constructor( private typeService: TypeService ,
              private titleService: Title ,
              private router: Router ,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.titleService.setTitle("Gestion de stock - Sciencia");
    this.getAllType();
  }

  
  getAllType() {
    this.typeService.getAll().subscribe((data: Type[]) => {
      console.log("response get all types :",data);
      this.types = data;
    });
  }





  deleteType(id){

    console.log("delete star ");
    console.log(id);
    
    this.typeService.delete(id).subscribe(
      data => {
        console.log(data);
        this.getAllType() ;
      },
      err => {

      }
    );
  }
  

 public goToAddType() {
    this.router.navigate(['gestionType/addType']);
  }

  
 public goToModifierType(id) {
  this.router.navigate(['gestionType/modifierType',id]);
}

  

  openDialog(id): void {
    const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
      data: {id: id  ,title : "Confirmer la suppression" , subtitle :"Êtes-vous sûr de vouloir supprimer ce Kit ?",btn_titre :"Supprimer"}
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log("resultat", result);
     
      if(result){
        this.deleteType(id)
      }
    
    });
  }





}
