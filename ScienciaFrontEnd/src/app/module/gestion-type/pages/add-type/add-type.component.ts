import { TypeService } from './../../services/type.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {

  typeForm : FormGroup ;

  constructor(
    public fb: FormBuilder ,
    private titleService: Title , 
    private router: Router , 
    private typeService: TypeService
  ) { }

  ngOnInit(): void {
    this.typeForm = this.fb.group({
      nom:  ['' , Validators.required] 
    });
  }

  onSubmit() {

    console.log(this.typeForm.value);
    this.typeService.create(this.typeForm.value).subscribe(
      data => {
        console.log(data);
        this. gotoListeType();
      }
    );
  }

  gotoListeType() {
    
    this.router.navigate(['gestionType/listType']);
  }

}
