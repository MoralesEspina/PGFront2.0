import { SaleService } from './../../../services/sale.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-index',
  templateUrl: './sales-index.component.html',
  styleUrls: ['./sales-index.component.css']
})
export class SalesIndexComponent implements OnInit {

  public p: number = 1;
  public sales;
  constructor(private _saleService:SaleService) { }

  ngOnInit(): void {
  this.getSales();
  }

  search(salesForm){

  }

  getSales(){
    this._saleService.getSales().subscribe(
      response =>{
        this.sales = response.ventas;
      }, error =>{
      }
    )
  }

}
