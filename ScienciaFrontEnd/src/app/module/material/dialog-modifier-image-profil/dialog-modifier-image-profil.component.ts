import { HttpHeaders, HttpClient } from '@angular/common/http';
import { UserService } from './../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';


interface DialogData {
  id: number;
}


@Component({
  selector: 'app-dialog-modifier-image-profil',
  templateUrl: './dialog-modifier-image-profil.component.html',
  styleUrls: ['./dialog-modifier-image-profil.component.scss']
})
export class DialogModifierImageProfilComponent implements OnInit {

  uploadForm : FormGroup ;

  file : any;

  constructor(private httpClient: HttpClient,
    public fb: FormBuilder , public dialogRef: MatDialogRef<DialogModifierImageProfilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      image:  ['' , Validators.required],   
    });
  }

  

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){

    console.log("on submit upload image") ;
      console.log("file :",this.file) ;
  //  this.file = this.uploadForm.get('image').value ;
  this.uploadImage(this.data.id ,this.file)
        this.dialogRef.close();
     
  }

  onFileSelect(event) {
    if (event.target.files.length > 0) {
      const filetmp = event.target.files[0];
      this.file = event.target.files[0];
     // this.uploadForm.get('image').setValue(filetmp);
    }
  }

  uploadImage(id ,file){

    console.log("on submit upload image") ;
  
    var formData : any = new FormData();
    formData.append("file", file);
    formData.append("id", id +"");
    formData.append("photo", "photo_profile_" + id+".png");
    let  httpOptions = {
      headers: new HttpHeaders()
    };
console.log("service upload image format :",formData);
 this.httpClient.post('http://localhost:3000/api/user/uploadImageUser' , formData,httpOptions).subscribe(
    data => {
      console.log("response upload image ",data);
        
    },
    err => {
      console.log("error upload image ",err);
   
    }
  );
  }

  


}
