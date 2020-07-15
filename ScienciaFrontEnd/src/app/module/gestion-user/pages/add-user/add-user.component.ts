import { Title } from '@angular/platform-browser';
import { UserService } from './../../../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup;
  validatePassword = true;

  constructor(private router: Router, private titleService: Title, private userService: UserService, public fb: FormBuilder) { }

  ngOnInit(): void {
    this.titleService.setTitle("Ajouter Utilisateur - Sciencia");
    this.userForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmpassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      nom: [''],
      prenom: [''],
      adresse: ['', Validators.required],
      photo: [''],
      telephone: ['', Validators.required],
      role: ['', Validators.required],
      dateNaissance: [''],
      etat: ['']
    });

    this.userForm.value.etat = 'active';
    this.userForm.value.nom = '';
    this.userForm.value.prenom = '';
    this.userForm.value.dateNaissance = '';

  }
  ngOnChanges(): void {
    if (this.userForm.value.password === this.userForm.value.confirmpassword) {
      this.validatePassword = true ;
    } else {
      this.validatePassword = false;
    }
    
  }
          
                    

  gotoListeUser() {
    this.router.navigate(['gestionUser/listeUser']);
  }

  onSubmit() {
    if (this.userForm.value.password === this.userForm.value.confirmpassword) {
      this.validatePassword = true ;
      this.userForm.value.etat = 'active';

      if (this.userForm.value.role === 'Ecole') {
        this.userForm.value.prenom = null;
        this.userForm.value.dateNaissance = null;
      } else {
      }
          

      console.log(this.userForm.value); 
      this.userService.create(this.userForm.value).subscribe(
        data => {
          console.log(data);
          this.gotoListeUser();
        },
        err => {

        }
      );

    } else {
      this.validatePassword = false;
    }
  }

}