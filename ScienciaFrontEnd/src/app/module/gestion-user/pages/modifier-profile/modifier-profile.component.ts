import { Title } from '@angular/platform-browser';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { User } from './../../../../model/user';
import { TokenStorageService } from './../../../../services/token-storage.service';
import { UserService } from './../../../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-modifier-profile',
  templateUrl: './modifier-profile.component.html',
  styleUrls: ['./modifier-profile.component.scss']
})
export class ModifierProfileComponent implements OnInit {



  userForm: FormGroup;
  ecoleForm : FormGroup ;
  dateNaissance : string ;
  userConnecte : User;
  adresseArray : string[] = ["Ariana","Béja","Ben Arous","Bizerte","Gabès", "Gafsa",
  "Jendouba","Kairouan","Kasserine","Kébili","Le Kef", "Mahdia",
  "La Manouba","Médenine","Monastir","Nabeul","Sfax","Sidi Bouzid", 
   "Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"]
 
  constructor(private router: Router,private titleService: Title, private userService: UserService, public fb: FormBuilder,
    private tokenStorageService : TokenStorageService) { }


  ngOnInit(): void {
    this.titleService.setTitle("Modifier information - Sciencia");
    this.userConnecte = this.tokenStorageService.getUser();
  
    this.userForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      nom: ['',Validators.required],
      prenom: ['',Validators.required],
      adresse: ['', Validators.required],
  
      telephone: ['', Validators.required],
      dateNaissance: ['',Validators.required],
    });

    this.ecoleForm = this.fb.group({
      username: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      nom: ['',Validators.required],
    
      adresse: ['', Validators.required],
  
      telephone: ['', Validators.required],
    });

    
  }

      
                    

  gotoProfile() {
    this.router.navigate(['profile']);
  }

  onSubmit() {
    
      if (this.userConnecte.role === 'Ecole') {
        this.userConnecte.username = this.ecoleForm.value.username ;
        this.userConnecte.email = this.ecoleForm.value.email ;
        this.userConnecte.nom = this.ecoleForm.value.nom ;
        this.userConnecte.telephone = this.ecoleForm.value.telephone ;
        this.userConnecte.adresse = this.ecoleForm.value.adresse ;
        this.userConnecte.prenom = null ;
        this.userConnecte.dateNaissance = null ;
      } else{
        this.userConnecte.username = this.userForm.value.username ;
        this.userConnecte.email = this.userForm.value.email ;
        this.userConnecte.nom = this.userForm.value.nom ;
        this.userConnecte.prenom = this.userForm.value.prenom ;
        this.userConnecte.dateNaissance = this.userForm.value.dateNaissance ;
        this.userConnecte.telephone = this.userForm.value.telephone ;
        this.userConnecte.adresse = this.userForm.value.adresse ;
      }

      console.log("information user after submit ",this.userConnecte); 

      this.userService.update(this.userConnecte).subscribe(
        data => {
          console.log("response update profile ",data);
          this.getUserById(this.userConnecte.id);
          console.log("information user after response ",this.userConnecte); 
          this.gotoProfile();
         
        },
        err => {
        }
      );
  }

  getUserById(id) {
    this.userService.getById(id).subscribe((data: User) => {
      console.log("get user by id",data);
        this.userConnecte.dateNaissance = data.dateNaissance ;
        this.tokenStorageService.saveUser(this.userConnecte);
        
    });
  }

 

}
