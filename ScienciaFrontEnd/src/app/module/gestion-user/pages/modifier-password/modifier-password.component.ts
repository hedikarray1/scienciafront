import { Title } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../../../model/user';
import { UserService } from './../../../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifier-password',
  templateUrl: './modifier-password.component.html',
  styleUrls: ['./modifier-password.component.scss']
})
export class ModifierPasswordComponent implements OnInit {

  user : User ;
  userForm: FormGroup;

  constructor(private router: Router, private titleService: Title , private userService: UserService, public fb: FormBuilder,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle("Modifier Mot de passe - Sciencia");
    this.getUser( this.route.snapshot.paramMap.get('id')) ;
   
    this.userForm = this.fb.group({
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      confirmpassword: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });


  }

  getUser(id) {
    this.userService.getById(id).subscribe((data: User) => {
      console.log("response get user by id",data);
      this.user = data;
    });
  }

  
  onSubmit() {
    
     if (this.userForm.value.password != this.userForm.value.confirmpassword ){
        console.log("wrong passsword");
     }else{
    this.userService.updatePassword(this.user.id,this.userForm.value.password).subscribe(
      data => {
        console.log("response update user Paswword ",data);
        this.gotoDetailUser(this.user.id)  ;
      },
      err => {
      }
    );

    }
}


gotoDetailUser(id) {
  this.router.navigate(['gestionUser/detailUser',id]);
}

}
