import { Title } from '@angular/platform-browser';
import { TokenStorageService } from './../../services/token-storage.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role = '' ;
  name = '';

  constructor(private authService: AuthService, private titleService: Title, private tokenStorage: TokenStorageService, private router: Router) {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
      this.role = this.tokenStorage.getUser().role;
      this.name = this.tokenStorage.getUser().prenom + '  ' + this.tokenStorage.getUser().nom ;
      this.gotoHome() ;
    }
   }

  ngOnInit() {
    this.titleService.setTitle("Authentification - Sciencia");
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.role = this.tokenStorage.getUser().role;
      this.role = this.tokenStorage.getUser().role;
      this.name = this.tokenStorage.getUser().prenom + '  ' + this.tokenStorage.getUser().nom ;
      this.gotoHome() ;
    }
    console.log(this.tokenStorage.getUser());
    console.log(this.tokenStorage.getToken());
  }

  onSubmit() {
    this.authService.login(this.form).subscribe(
      data => {

        console.log('login data : ' + data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.tokenStorage.saveBackgroundState(true);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.tokenStorage.getUser().role;
        console.log(this.tokenStorage.getUser());
        this.reloadPage();
        this.gotoHome() ;
      },
      err => {
        console.log('login error : ' );
        console.log(err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage() {
    window.location.reload();
  }

  gotoHome() {
    this.router.navigate(['home']);
  }

}
