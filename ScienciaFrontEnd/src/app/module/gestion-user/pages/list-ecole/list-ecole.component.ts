import { User } from './../../../../model/user';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { UserService } from './../../../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-ecole',
  templateUrl: './list-ecole.component.html',
  styleUrls: ['./list-ecole.component.scss']
})
export class ListEcoleComponent implements OnInit {

  users: User[];

  searchText ="";

  constructor(private userService: UserService , private titleService: Title , private router : Router) { }

  ngOnInit(): void {
    this.titleService.setTitle("Gestion des utilisateurs - Sciencia");
    this.getAllUser();
  }

  getAllUser() {
    this.userService.getByRole("Ecole").subscribe((data: User[]) => {
      console.log(data);
      this.users = data;
    });
  }

  
  gotoAddUser() {
    this.router.navigate(['gestionUser/addUser']);
  }

  public goToDetaitUser(id) {
    this.router.navigate(['gestionUser/detailEcole',id]);
  }

  changeSource(event) { 
    event.target.src = "../../../../../assets/profile photo.png";
   }


}
