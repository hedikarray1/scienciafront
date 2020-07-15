import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { FormationService } from './../../service/formation.service';
import { Formation } from './../../../../model/formation';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-formation-ecole',
  templateUrl: './list-formation-ecole.component.html',
  styleUrls: ['./list-formation-ecole.component.scss']
})
export class ListFormationEcoleComponent implements OnInit {

  formations : Formation[];

  searchText ="";
  constructor( private router : Router ,private titleService: Title, private formationService : FormationService ) { }

  ngOnInit(): void {
    this.titleService.setTitle("Nos formation - Sciencia");
    this.getAllFormation();
  }

  
  getAllFormation() {
    this.formationService.getAll().subscribe((data:   []) => {
      console.log(data);
      this.formations = data;
    });
  }

  goToReservation(id){
    this.router.navigate(['gestionReservation/addReservation2',id]);
  }




}
