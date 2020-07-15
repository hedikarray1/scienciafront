import { StockService } from './../../gestion-stock/service/stock.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';


interface DialogData {
  id: number;
}


@Component({
  selector: 'app-dialog-modifier-image-stock',
  templateUrl: './dialog-modifier-image-stock.component.html',
  styleUrls: ['./dialog-modifier-image-stock.component.scss']
})
export class DialogModifierImageStockComponent implements OnInit {

  uploadForm : FormGroup ;

  file : any;

  constructor(private stockService : StockService ,
    public fb: FormBuilder , public dialogRef: MatDialogRef<DialogModifierImageStockComponent>,
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
    this.stockService.uploadImage(id, file).subscribe(
      data2 => {
        console.log("response upload image stock ",data2);
       
  },
  err2 => {

  }
);
  }

  


}
