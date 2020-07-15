import { async } from '@angular/core/testing';
import { MessagerieService } from './module/gestion-messagerie/service/messagerie.service';
import { Notification } from './model/notification';
import { User } from './model/user';
import { NotificationService } from './services/notification.service';
import { Router } from '@angular/router';
import { TokenStorageService } from './services/token-storage.service';
import { Component, OnInit, Renderer2, ViewChild, ElementRef, Directive, Output, HostListener } from '@angular/core';
import { EventEmitter } from 'protractor';
import { interval, Subscription } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'ScienciaFrontEnd';

  @ViewChild('overlayNotif') overlayNotif: ElementRef;
  isOpen = false;

  isLoggedIn = false;
  showAdminBoard = true;
  showModeratorBoard = false;

  collapsed = true;

  subscription: Subscription;
  
  userConnecte : User ; 
  notifications : Notification[] ;

  notifNotRead : number =0 ;
  msgNotRead : number =0 ;

  backgroundState = true ;

  constructor(private tokenStorageService: TokenStorageService,
               private router: Router, private notifservice : NotificationService ,
               private messageService: MessagerieService
               ) {
  

   }

   onClickedOutside(e: Event) {
     if (this.isOpen){
   if(e.target !== this.overlayNotif.nativeElement && !this.overlayNotif.nativeElement.contains(e.target)){
      this.isOpen=false;
  }
     }
  }
  

  ngOnInit() {
    const source = interval(10000);
  this.subscription = source.subscribe(val => {
    if (this.isLoggedIn) {
    this.getCountNotif();
    this.getCountMSG() ;
      this.getAllNotification();
    }
  });

    this.isLoggedIn = !!this.tokenStorageService.getToken();
    this.backgroundState = this.tokenStorageService.getBackgroundState()

    if (this.isLoggedIn) {
     this.userConnecte = this.tokenStorageService.getUser();

     this.getAllNotification();
     this.getCountNotif();
     this.getCountMSG() ;
    }
    else{
    this.gotoLogin();
    }
  }

  
  async getCountNotif() {
   
    await  this.notifservice.countNotifByIdRecepteur(this.userConnecte.id).subscribe((data: any) => {
      console.log("response countNotifByIdRecepteur",data.nbr);
      this.notifNotRead = data.nbr;
    });
  }
 

  

  async getCountMSG() {
   await this.messageService.countMsgNotRead(this.userConnecte.id).subscribe((data: any) => {
      console.log("response countMsgNotRead",data.nbr);
      this.msgNotRead = data.nbr;
    });
  }


async goToRedirecteNotif(notif : Notification){

  if(notif.status == 0){
 await this.notifservice.updateStatus(notif.id,1).subscribe((data: any) => {
    console.log("response updateStatus ",data);
    this.getAllNotification();
    console.log("redirecte to ",notif.redirection);
    this.isOpen=false;
    this.router.navigate([notif.redirection]);
  });
}
else{
  console.log("redirecte to ",notif.redirection);
  this.isOpen=false;
  this.router.navigate([notif.redirection]);
}
}


async  getAllNotification() {
 
    await  this.notifservice.getByIdRecepteur(this.userConnecte.id).subscribe( (data : Notification[] )=> {
      console.log(" notification ",data);
      this.notifications = data ;
      this.getCountNotif();
    });
  }
  
    
  
  gotoLogin() {
    this.router.navigate(['login']);
  }

  logout() {
    this.tokenStorageService.signOut();
  //  window.location.reload();
  }

ngOnDestroy() {
  this.subscription.unsubscribe();
}

  
changeSource(event) { 
  event.target.src = "../assets/profile photo.png";
 }
}
