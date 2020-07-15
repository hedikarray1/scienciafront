import { Title } from '@angular/platform-browser';
import { NotificationService } from './../../../services/notification.service';
import { formatDate } from '@angular/common';
import { UserService } from './../../../services/user.service';
import { FormationService } from './../../gestion-formation/service/formation.service';
import { ReservationService } from './../service/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { TokenStorageService } from './../../../services/token-storage.service';
import { Formation } from './../../../model/formation';
import { User } from './../../../model/user';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-reservation-formation',
  templateUrl: './add-reservation-formation.component.html',
  styleUrls: ['./add-reservation-formation.component.scss']
})
export class AddReservationFormationComponent implements OnInit {

  reservationForm: FormGroup;
  formateurs : User[];
 
  formationURL : Formation;

  
  
  constructor(public fb: FormBuilder, 
              private tokenStorage: TokenStorageService , 
    private notifService : NotificationService,
              private router: Router,
              private titleService: Title , 
              private reservationService: ReservationService, 
              private formationService : FormationService ,
              private userService : UserService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle("Réserver une formation - Sciencia");
    this.getFormationById(this.route.snapshot.paramMap.get('id') )
    
    this.reservationForm = this.fb.group({
      id_formateur: ['', Validators.required],
      id_ecole: ['' ],
      id_formation: ['' ],
      nbr_enfants: ['' , Validators.required],
      date_formation: ['' , Validators.required],
      date_reservation: ['' ],
      prix_totale: [''],
      status : [''] ,
      status_validation : [''] ,
    });
   
   
    
    this.getFormateurs();
  }

  gotoListeFormationEcole() {
    this.router.navigate(['gestionFormationEcole/listFormationEcole']);
  }

  getFormateurs() {
    this.userService.getByRole("Formateur").subscribe((data: User[]) => {
      console.log("list des formateurs",data);
      this.formateurs = data;
    });
  }


  
  getPrixFormation(nbr)  {
    
      return  this.formationURL.prix_enfant_heure * nbr
   
  }

  
  gotoListeReservation() {
    this.router.navigate(['gestionReservation']);
  }

  

  getFormationById(id) {
    this.formationService.getById(id).subscribe((data: Formation) => {
      console.log("get formateur by id",data);
      this.formationURL = data;
    });
  }

  onSubmit() {

    this.reservationForm.value.id_ecole = this.tokenStorage.getUser().id;
    this.reservationForm.value.id_formation = this.formationURL.id ;
    this.reservationForm.value.date_reservation = new Date() ;
    this.reservationForm.value.prix_totale =this.getPrixFormation(this.reservationForm.value.nbr_enfants);
    this.reservationForm.value.status = 0;
    this.reservationForm.value.status_validation = 0;
    console.log(this.reservationForm.value);
    this.reservationService.create(this.reservationForm.value).subscribe(
      data => {
        console.log(data);
        this.sendNotif(this.reservationForm.value.id_formateur);
        this.gotoListeReservation() ;
      },
      err => {
      }
    );

  }

  
  sendNotif(recepteur) {

    let notif = {
      
        id_sender: this.tokenStorage.getUser().id ,
        id_recepteur: recepteur ,
        titre: "a envoyé une demande de reservation " ,               
        redirection:  "gestionReservationFormateur/listeReservationFormateur",
        date: Date() ,
        status: 0 
    }
    this.notifService.create(notif).subscribe(
      data => {
        console.log("response send notif : ",data);
      }
    );
  }

  

}
