import { Title } from '@angular/platform-browser';
import { Reservation } from './../../../../model/reservation';
import { ReservationService } from './../../../gestion-reservation/service/reservation.service';
import { User } from './../../../../model/user';
import { TokenStorageService } from './../../../../services/token-storage.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { View, EventSettingsModel, WorkHoursModel, TimeScaleModel } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-afficher-emploi',
  templateUrl: './afficher-emploi.component.html',
  styleUrls: ['./afficher-emploi.component.scss']
})
export class AfficherEmploiComponent implements OnInit {

  userConnecte : User;
 

  public views : String[] =['Day' ,'Week' ,'Month' ,'Agenda']

   public currentView: View = 'Agenda';
   public selectedDate: Date = new Date();
   public isReadOnly: number = 3;
 
   public allowVirtualScroll: boolean = true;
  
  public eventSettings: EventSettingsModel ;

  constructor(private router : Router,
              private tokenStorageService : TokenStorageService,
              private titleService: Title,
              private reservationService : ReservationService 
    ) { 

    }

  ngOnInit(): void {
    this.titleService.setTitle("Emploi - Sciencia");
    this.userConnecte = this.tokenStorageService.getUser();
    this.getAllActivite() ;
    

    
  }

  
  getAllActivite() {

    this.reservationService.getActiviteFormateur(this.userConnecte.id).subscribe((data: any[]) => {
      console.log(data);
      
      this.eventSettings  = {
        dataSource: data 
      }
      console.log("event setting", this.eventSettings);
    });


  }

  
  

  
  
}
