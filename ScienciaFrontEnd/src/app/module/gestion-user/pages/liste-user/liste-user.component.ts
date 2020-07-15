import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { User } from './../../../../model/user';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-liste-user',
  templateUrl: './liste-user.component.html',
  styleUrls: ['./liste-user.component.scss']
})
export class ListeUserComponent implements OnInit {

  users: User[];

  searchText ="";

  constructor(private userService: UserService , private titleService: Title , private router : Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Gestion des utilisateurs - Sciencia");
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getAll().subscribe((data: User[]) => {
      console.log(data);
      this.users = data;
    });
  }

  
  gotoAddUser() {
    this.router.navigate(['gestionUser/addUser']);
  }

  public goToDetaitUser(id) {
    this.router.navigate(['gestionUser/detailUser',id]);
  }

  changeSource(event) { 
    event.target.src = "../../../../../assets/profile photo.png";
   }

}
