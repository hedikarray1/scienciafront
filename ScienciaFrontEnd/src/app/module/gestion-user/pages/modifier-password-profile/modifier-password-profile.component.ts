import { Title } from '@angular/platform-browser';
import { by } from 'protractor';
import { TokenStorageService } from './../../../../services/token-storage.service';
import { UserService } from './../../../../services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../../../model/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifier-password-profile',
  templateUrl: './modifier-password-profile.component.html',
  styleUrls: ['./modifier-password-profile.component.scss']
})
export class ModifierPasswordProfileComponent implements OnInit {


  user : User ;
  userForm: FormGroup;

  constructor(private titleService: Title,private router: Router, private userService: UserService, public fb: FormBuilder,private tokenStorageService : TokenStorageService) { }

  ngOnInit(): void {
    this.titleService.setTitle("Modifier Mot de passe - Sciencia");
    this.user = this.tokenStorageService.getUser();
       
    this.userForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmpassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });

    this.userForm.controls['password'].pristine
  }

  onSubmit() {
    
    if (this.userForm.value.password != this.userForm.value.confirmpassword ){
       console.log("wrong passsword");
    }else{
   this.userService.updatePassword(this.user.id,this.userForm.value.password).subscribe(
     data => {
       console.log("response update user Paswword ",data);
       this.gotoProfile()  ;
     },
     err => {
     }
   );

   }
}
  
  gotoProfile() {
    this.router.navigate(['profile']);
  }

}
