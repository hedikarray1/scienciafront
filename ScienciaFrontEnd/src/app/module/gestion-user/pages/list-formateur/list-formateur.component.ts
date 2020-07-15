import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { User } from './../../../../model/user';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-formateur',
  templateUrl: './list-formateur.component.html',
  styleUrls: ['./list-formateur.component.scss']
})
export class ListFormateurComponent implements OnInit {

  users: User[];

  searchText ="";

  constructor(private userService: UserService , private titleService: Title , private router : Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Gestion des utilisateurs - Sciencia");
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getByRole("Formateur").subscribe((data: User[]) => {
      console.log(data);
      this.users = data;
    });
  }

  
  gotoAddUser() {
    this.router.navigate(['gestionUser/addUser']);
  }

  public goToDetaitUser(id) {
    this.router.navigate(['gestionUser/detailFormateur',id]);
  }

  changeSource(event) { 
    event.target.src = "../../../../../assets/profile photo.png";
   }


}
