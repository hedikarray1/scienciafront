import { Title } from '@angular/platform-browser';
import { Stock } from './../../../../model/stock';
import { StockService } from './../../service/stock.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modifier-stock',
  templateUrl: './modifier-stock.component.html',
  styleUrls: ['./modifier-stock.component.scss']
})
export class ModifierStockComponent implements OnInit {

  stockForm : FormGroup ;
  stock : Stock ;

  typeArray : string[] = ["Robotique","Mecanique"];

  constructor(public fb: FormBuilder ,private titleService: Title,  private router: Router , private stockService : StockService,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.titleService.setTitle("Modifier kit - Sciencia");
    this.getStock( this.route.snapshot.paramMap.get('id'));
    this.stockForm = this.fb.group({
      nom:  ['' , Validators.required],
      description: ['' , Validators.required],
      type: ['' , Validators.required],
      prix: ['' , Validators.required],
      quantite:  ['' , Validators.required],   
    });
  
  }

  
  getStock(id) {
    this.stockService.getById(id).subscribe((data: Stock) => {
      console.log("response get stock by id",data);
      this.stock = data;
    });
  }

  
  gotoListeStock() {
    this.router.navigate(['gestionStock/listStock']);
  }

  onSubmit() {
    console.log("stocck form value : ",this.stockForm.value);
    let StModifier : Stock ;
    StModifier = this.stockForm.value ;
    StModifier.id = this.stock.id ;
    this.stockService.modifier(StModifier).subscribe(
      data => {
        console.log("response modifier stock : ", data);
        this.gotoListeStock() ;
      },
      err => {
      console.log("error : " , err);

      }
    );
  }


}
