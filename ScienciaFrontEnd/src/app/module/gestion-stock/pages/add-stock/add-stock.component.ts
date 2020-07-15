import { TypeService } from './../../../gestion-type/services/type.service';
import { Type } from './../../../../model/type';
import { HttpHeaders } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { StockService } from './../../service/stock.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './add-stock.component.html',
  styleUrls: ['./add-stock.component.scss']
})
export class AddStockComponent implements OnInit {

  stockForm : FormGroup ;

  file : any;

  types : Type[];


  constructor(public fb: FormBuilder ,
    private titleService: Title , 
    private router: Router , 
    private typeService: TypeService,
    private stockService : StockService) { }

  ngOnInit(): void {
    this.titleService.setTitle("Ajouter un Composant - Sciencia");
   this.getAllType();
    this.stockForm = this.fb.group({
      nom:  ['' , Validators.required],
      description: ['' , Validators.required],
      type: ['' , ],
      photo: ['' , ],
      prix: ['' , Validators.required],
      quantite:  ['' , Validators.required],   
    });
  }


  
  getAllType() {
    this.typeService.getAll().subscribe((data: Type[]) => {
      console.log("response get all types :",data);
      this.types = data;
    });
  }
  
  gotoListeStock() {
    
    this.router.navigate(['gestionStock/listStock']);
  }

  onSubmit() {

    console.log(this.stockForm.value);
    this.stockService.create(this.stockForm.value).subscribe(
      data => {
        console.log(data);
        this.stockService.uploadImage(data.id , this.file).subscribe(
          data2 => {
            console.log("response upload image stock ",data2);
            this.gotoListeStock() ;
      },
      err2 => {

      }
    );

       
      },
      err => {

      }
    );
  }


  
  onFileSelect(event) {
    if (event.target.files.length > 0) {
    
      this.file = event.target.files[0];
    }
  }


 

}
