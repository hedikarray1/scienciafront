import { Title } from '@angular/platform-browser';
import { Formation } from './../../../../model/formation';
import { FormationService } from './../../service/formation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifier-formation',
  templateUrl: './modifier-formation.component.html',
  styleUrls: ['./modifier-formation.component.scss']
})
export class ModifierFormationComponent implements OnInit {

  formationForm : FormGroup ;
  formation : Formation ;

  typeArray : string[] = ["Robotique","Mecanique"];

  constructor(public fb: FormBuilder ,private titleService: Title,   private router: Router , private formationService : FormationService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle("Modifier une formation - Sciencia");
this.getFormation( this.route.snapshot.paramMap.get('id'));
  
this.formationForm = this.fb.group({
      nom:  ['' , Validators.required],
      description: ['' , Validators.required],
      type: ['' , Validators.required],
      prix_enfant_heure: ['' , Validators.required],
      duree :  ['' , Validators.required]
    });

   // this.formationForm.setValue(this.formation);

  }

  getFormation(id) {
    this.formationService.getById(id).subscribe((data:   Formation) => {
      console.log("response get formation by id",data);
      this.formation = data;
    });
  }

  
  gotoListeFormation() {
    this.router.navigate(['gestionFormation/listFormation']);
  }

  onSubmit() {

    console.log(this.formationForm.value);
    let FroModifier : Formation ;
    FroModifier = this.formationForm.value;
    FroModifier.id = this.formation.id
    FroModifier.detail_pdf = this.formation.detail_pdf ;
    this.formationService.modifier(FroModifier).subscribe(
      data => {
        console.log(data);
        this.gotoListeFormation() ;
      },
      err => {

      }
    );
  }

}
