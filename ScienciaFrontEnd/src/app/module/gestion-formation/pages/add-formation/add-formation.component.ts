import { Title } from '@angular/platform-browser';
import { FormationService } from './../../service/formation.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './add-formation.component.html',
  styleUrls: ['./add-formation.component.scss']
})
export class AddFormationComponent implements OnInit {

  formationForm : FormGroup ;
  file : any;

  constructor(public fb: FormBuilder ,private titleService: Title, private router: Router , private formationService : FormationService) { }

  ngOnInit(): void {
    this.titleService.setTitle("Ajouter une formation - Sciencia");
    this.formationForm = this.fb.group({
      nom:  ['' , Validators.required],
      description: ['' , Validators.required],
      type: ['' , ],
      prix_enfant_heure: ['' , Validators.required],
      detail_pdf:  ['' , Validators.required],   
      duree :['' , Validators.required]
    });
  }

  
  gotoListeFormation() {
    this.router.navigate(['gestionFormation/listFormation']);
  }

  onSubmit() {

    console.log(this.formationForm.value);
    this.formationService.create(this.formationForm.value).subscribe(
      data => {
        console.log(data);
        this.formationService.uploadPdf(data.id , this.file).subscribe(
          data2 => {
            console.log("response upload pdf ",data2);
        this.gotoListeFormation() ;
      },
      err2 => {

      }
    );
      },
      err => {

      }
    );
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      
      this.file = event.target.files[0];
  
    }
  }

}
