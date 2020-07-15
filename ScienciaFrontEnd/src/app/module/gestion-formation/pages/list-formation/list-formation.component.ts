import { Title } from '@angular/platform-browser';
import { DiglogSuppressionComponent } from './../../../material/diglog-suppression/diglog-suppression.component';
import { Formation } from './../../../../model/formation';
import { FormationService } from './../../service/formation.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import {  MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './list-formation.component.html',
  styleUrls: ['./list-formation.component.scss']
})
export class ListFormationComponent implements OnInit {

  formations : Formation[];

  searchText ="";
  constructor( private router : Router ,private titleService: Title, private formationService : FormationService , public dialog: MatDialog) { }

  ngOnInit(): void {
    this.titleService.setTitle("Gestion de formation - Sciencia");
    this.getAllFormation();
  }

  
  getAllFormation() {
    this.formationService.getAll().subscribe((data:   []) => {
      console.log(data);
      this.formations = data;
    });
  }

  deleteFormation(id){

    console.log("delete start ");
    console.log(id);
    
    this.formationService.delete(id).subscribe(
      data => {
        console.log(data);
        this.getAllFormation() ;
      },
      err => {

      }
    );
  }

 goToAddFormation() {
  this.router.navigate(['gestionFormation/addFormation']);
}


goToModifierFormation(id) {
  this.router.navigate(['gestionFormation/modifierFormation',id]);
}


openDialog(id): void {
  const dialogRef = this.dialog.open(DiglogSuppressionComponent, {
    data: {id: id ,title : "Confirmer la suppression" , subtitle : "Êtes-vous sûr de vouloir supprimer cette formation ?",btn_titre :"Supprimer"}
  });
 
  dialogRef.afterClosed().subscribe(result => {
    console.log("resultat", result);
   
    if(result){
      this.deleteFormation(id)
    }
  
  });
}


}
