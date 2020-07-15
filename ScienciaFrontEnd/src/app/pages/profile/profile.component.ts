import { Title } from '@angular/platform-browser';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from './../../services/user.service';
import { DialogModifierImageProfilComponent } from './../../module/material/dialog-modifier-image-profil/dialog-modifier-image-profil.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TokenStorageService } from './../../services/token-storage.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  userConnecte : User;

  timeStamp = (new Date()).getTime();

  constructor(private titleService: Title,private tokenStorageService : TokenStorageService,private router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userConnecte = this.tokenStorageService.getUser();
    this.titleService.setTitle("Profil - Sciencia ");
  }


  gotoModifierProfile() {
    this.router.navigate(['profile/modifier']);
  }

  
  gotoModifierProfilePassword() {
    this.router.navigate(['profile/modifierPassword']);
  }

                                               
  
  openDialog(): void {
    console.log("open dialog modifier image") ;
    const dialogRef = this.dialog.open(DialogModifierImageProfilComponent, {
      data: {id: this.userConnecte.id }
    });
   
    dialogRef.afterClosed().subscribe(result => {
      console.log("resultat", result);
      
      this.userConnecte.photo = "photo_profile_"+this.userConnecte.id+".png";
     this.tokenStorageService.saveUser(this.userConnecte);
     this.setLinkPicture();
   
    
    });
  }


  changeSource(event) { 
    event.target.src = "../../../../assets/profile photo.png";
   }

   public getLinkPicture() {
    if(this.timeStamp) {
       return "http://localhost:3000/image_user/" + this.userConnecte.photo + '?' + this.timeStamp;
    }
  return "http://localhost:3000/image_user/" +  this.userConnecte.photo;
}

public setLinkPicture() {
 
  this.timeStamp = (new Date()).getTime();
}



}
