import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { UserService } from './../../../services/user.service';
import { TokenStorageService } from './../../../services/token-storage.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from './../../../model/user';
import { Message } from './../../../model/Message';
import { MessagerieService } from './../service/messagerie.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  templateUrl: './messagerie.component.html',
  styleUrls: ['./messagerie.component.scss']
})
export class MessagerieComponent implements OnInit {

  messageChat: Message[];
  messageInBox: Message[];
  allUser: User[];
  message: any;
  userChat: User;
  msg: any;
  messageForm: FormGroup;
  msgvide: String = "";
  userConnecte: User;

  msgNotRead: number = 0;
  subscription: Subscription;
  msgBoxState: Boolean = false;


  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  searchText = "";

  constructor(private messageService: MessagerieService,private titleService: Title, public fb: FormBuilder, private tokenStorageService: TokenStorageService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.titleService.setTitle("Messagerie - Sciencia");
    const source = interval(5000);
    this.subscription = source.subscribe(val => {
     console.log("new date ",new Date);
      this.getCountMSG();
      if (this.msgNotRead > 0) {
      this.getAllMessageInBox2(this.userConnecte.id);
      }

    });
    this.messageForm = this.fb.group({
      sendMessage: ['', Validators.required]
    });
    this.userConnecte = this.tokenStorageService.getUser();

    this.getAllUser();

    this.getAllMessageInBox(this.userConnecte.id);

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  async getAllMessageChat(msg) {
    await this.messageService.getMessagechat(msg).subscribe((data: Message[]) => {
      console.log("message Chat", data);
      if (data.length == 0) {
        this.messageChat = []
      } else {

        this.messageChat = data;

        this.scrollToBottom();
      }
    });
  }


  async getAllMessageInBox(id) {
    await this.messageService.getMessageInBox(id).subscribe((data: Message[]) => {
      console.log("message InBox", data);
      console.log("message InBox length", data.length);
      if (data.length == 0) {
        this.messageInBox = [];
        this.msgBoxState = false;
      } else {
        this.msgBoxState = true;
        this.messageInBox = data;
        if (this.messageInBox[0].expediteur.id != this.userConnecte.id) {
          this.userChat = this.messageInBox[0].expediteur;
        } else {
          this.userChat = this.messageInBox[0].destinataire;
        }
        this.setMessageEnvirenment(this.userChat);
      }
    });
  }


  async getAllMessageInBox2(id) {
    await this.messageService.getMessageInBox(id).subscribe((data: Message[]) => {
      console.log("message InBox", data);
      console.log("message InBox length", data.length);
      if (data.length == 0) {
        this.messageInBox = [];
        this.msgBoxState = false;
      } else {
        this.msgBoxState = true;
        this.messageInBox = data;
      }
      if (this.msgNotRead > 0) {
        if (this.messageInBox[0].expediteur.id == this.userChat.id) {
          this.setMessageEnvirenment(this.userChat);
        }
        if (this.messageInBox[0].destinataire.id == this.userChat.id) {
          this.setMessageEnvirenment(this.userChat);
        }
      }
    });
  }


  async getAllUser() {
    await this.userService.getAll().subscribe((data: User[]) => {
      console.log("all user", data);
      this.allUser = data;

    });
  }

  setMessageEnvirenment(usChat) {
    this.searchText = ""
    this.userChat = usChat;

    this.message = {
      "id_expediteur": this.userConnecte.id,
      "id_destinataire": this.userChat.id
    }
    let ss: string;
    if (this.userConnecte.id < this.userChat.id) {
      ss = this.userConnecte.id + "_" + this.userChat.id;
    } else {
      ss = this.userChat.id + "_" + this.userConnecte.id;
    }

    this.updateMessagechat(ss, this.userConnecte.id);
    this.getAllMessageInBox2(this.userConnecte.id);
    this.getAllMessageChat(this.message);

    this.scrollToBottom();
  }



  onSubmit() {
    console.log("new date", Date());
    var convId: string;
    if (this.userChat.id < this.userConnecte.id) {
      convId = this.userChat.id + "_" + this.userConnecte.id;
    } else {
      convId = this.userConnecte.id + "_" + this.userChat.id;
    }

    this.msg = {
      "id_destinataire": this.userChat.id,
      "id_expediteur": this.userConnecte.id,
      "date": Date(),
      "state": 0,
      "message": this.messageForm.value.sendMessage,
      "id_conversation": convId
    }



    this.messageService.create(this.msg).subscribe(
      data => {
        console.log(data);
        this.msgvide = "";
        this.getAllMessageInBox(this.userConnecte.id);
      },
      err => {

      }
    );
  }


  updateMessagechat(id_cov, id) {

    this.messageService.updateMessagechat(id_cov, id).subscribe(
      data => {
        console.log(data);
      },
      err => {
      }
    );
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  getOtherUser(uExp, uDes) {
    if (uDes.id != this.userConnecte.id) {
      return uDes;
    } else {
      return uExp;
    }
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  getCountMSG() {
    this.messageService.countMsgNotRead(this.userConnecte.id).subscribe((data: any) => {
      console.log("response countMsgNotRead", data.nbr);
      this.msgNotRead = data.nbr;
    });
  }


  changeSource(event) {
    event.target.src = "../../../../../assets/profile photo.png";
  }
}
