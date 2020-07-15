import { UserService } from './../../../services/user.service';
import { User } from './../../../model/user';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';


interface DialogData {
  id : number
}


@Component({
  selector: 'app-dialog-detail-user',
  templateUrl: './dialog-detail-user.component.html',
  styleUrls: ['./dialog-detail-user.component.scss']
})
export class DialogDetailUserComponent implements OnInit {

  timeStamp = (new Date()).getTime();
  user : User;

  constructor( private userService : UserService,
    public dialogRef: MatDialogRef<DialogDetailUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.getUser(this.data.id);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  getUser(id) {
    this.userService.getById(id).subscribe((data: User) => {
      console.log("response get user by id",data);
      this.user = data;
    });
  }
  
  changeSource(event) { 
    event.target.src = "../../../../assets/profile photo.png";
   }

   public getLinkPicture() {
    if(this.timeStamp) {
       return "http://localhost:3000/image_user/" + this.user.photo + '?' + this.timeStamp;
    }
  return "http://localhost:3000/image_user/" +  this.user.photo;
}


}
