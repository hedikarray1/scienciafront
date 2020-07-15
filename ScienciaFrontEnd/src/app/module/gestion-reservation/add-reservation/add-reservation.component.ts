import { Title } from '@angular/platform-browser';
import { NotificationService } from './../../../services/notification.service';
import { Formation } from './../../../model/formation';
import { User } from './../../../model/user';
import { UserService } from './../../../services/user.service';
import { FormationService } from './../../gestion-formation/service/formation.service';
import { TokenStorageService } from './../../../services/token-storage.service';
import { Reservation } from './../../../model/reservation';
import { ReservationService } from './../service/reservation.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';


@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})

export class AddReservationComponent implements OnInit {

  reservationForm: FormGroup;
  formateurs: User[];
  formations: Formation[];
  // formationURL : Formation;
  userConnecte : User;
  toDayDate: string = formatDate(new Date(), 'MM/dd/yyyy', 'en');


  constructor(public fb: FormBuilder,
    private tokenStorage: TokenStorageService,
    private router: Router,
    private titleService: Title , 
    private notifService : NotificationService,
    private reservationService: ReservationService,
    private formationService: FormationService,
    private userService: UserService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userConnecte = this.tokenStorage.getUser();
    this.titleService.setTitle("Réserver une formation - Sciencia");
    this.reservationForm = this.fb.group({
      id_formateur: ['', Validators.required],
      id_ecole: [''],
      id_formation: ['', Validators.required],
      nbr_enfants: ['', Validators.required],
      date_formation: ['',Validators.required ],
        date_reservation: [''],
        prix_totale: ['']  ,
        status: ['']  ,
        status_validation: ['']  ,
    });

 
    this.getFormateurs();
    this.getFormations();
  }

  gotoListeReservation() {
    this.router.navigate(['gestionReservation']);
  }

  getFormateurs() {
    this.userService.getByRoleAndRegion("Formateur",this.userConnecte.adresse).subscribe((data: User[]) => {
      console.log("list des formateurs", data);
      this.formateurs = data;
    });
  }


  getFormations() {
    this.formationService.getAll().subscribe((data: Formation[]) => {
      console.log("list des formation", data);
      this.formations = data;
    });
  }

  
  getPrixFormation(id,nbr)  {
    for (let val of this.formations) {
    if (val.id == id){
      return val.prix_enfant_heure * nbr
    } 
    }
  }
 
  onSubmit() {

    this.reservationForm.value.id_ecole = this.tokenStorage.getUser().id;
    this.reservationForm.value.date_reservation = new Date();
    this.reservationForm.value.prix_totale = this.getPrixFormation( this.reservationForm.value.id_formation, this.reservationForm.value.nbr_enfants);
    this.reservationForm.value.status = 0;
    this.reservationForm.value.status_validation = 0;
  
    console.log(this.reservationForm.value);

    this.reservationService.create(this.reservationForm.value).subscribe(
      data => {
        console.log(data);
        this.sendNotif(this.reservationForm.value.id_formateur);
        this.gotoListeReservation();
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
