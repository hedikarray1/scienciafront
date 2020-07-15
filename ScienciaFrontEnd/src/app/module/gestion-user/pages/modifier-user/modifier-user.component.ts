import { Title } from '@angular/platform-browser';
import { User } from './../../../../model/user';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from './../../../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifier-user',
  templateUrl: './modifier-user.component.html',
  styleUrls: ['./modifier-user.component.scss']
})
export class ModifierUserComponent implements OnInit {

  user :User ;

  userForm: FormGroup;

  typeArray : string[] = ["Admin","Employé","Formateur","Ecole"]

  ecoleForm : FormGroup ;

  dateNaissance : string ;

  adresseArray : string[] = ["Ariana","Béja","Ben Arous","Bizerte","Gabès", "Gafsa",
  "Jendouba","Kairouan","Kasserine","Kébili","Le Kef", "Mahdia",
  "La Manouba","Médenine","Monastir","Nabeul","Sfax","Sidi Bouzid", 
   "Siliana","Sousse","Tataouine","Tozeur","Tunis","Zaghouan"]

  constructor(private router: Router,private titleService: Title, private userService: UserService, public fb: FormBuilder,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle("Modifier information utilisateur - Sciencia");
    this.getUserById(this.route.snapshot.paramMap.get('id')) ;
    
   
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

  ngOnChanges(): void {
    
    
  }
          
   
  gotoDetailUser(id) {
    this.router.navigate(['gestionUser/detailUser',id]);
  }

  onSubmit() {
    
      if (this.user.role === 'Ecole') {
        this.user.username = this.ecoleForm.value.username ;
        this.user.email = this.ecoleForm.value.email ;
        this.user.nom = this.ecoleForm.value.nom ;
        this.user.telephone = this.ecoleForm.value.telephone ;
        this.user.adresse = this.ecoleForm.value.adresse ; 
        this.user.prenom = null ;
        this.user.dateNaissance = null ;
      } else{
        
        this.user.username = this.userForm.value.username ;
        this.user.email = this.userForm.value.email ;
        this.user.nom = this.userForm.value.nom ;
        this.user.prenom = this.userForm.value.prenom ;
        this.user.dateNaissance = this.userForm.value.dateNaissance ;
        this.user.telephone = this.userForm.value.telephone ;
        this.user.adresse = this.userForm.value.adresse ;

      }
          
      console.log("information user after submit ",this.user); 

      this.userService.update(this.user).subscribe(
        data => {
          console.log("response update profile ",data);
          this.gotoDetailUser(this.user.id);
         
        },
        err => {

        }
      );

    
  }

  

  getUserById(id) {
    this.userService.getById(id).subscribe((data: User) => {
      console.log("get user by id",data);
      this.user = data ;
        
    });
  }
}
