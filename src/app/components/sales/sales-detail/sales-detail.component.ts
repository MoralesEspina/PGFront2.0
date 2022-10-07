import { LoginService } from './../../../services/login.service';
import { SaleService } from './../../../services/sale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sales-detail',
  templateUrl: './sales-detail.component.html',
  styleUrls: ['./sales-detail.component.css']
})
export class SalesDetailComponent implements OnInit {

  public id_entrada;
  public sale :any = {
    id_user:'',
    id_client: '',
  };
  public detail_sale;
  public identity;

  constructor(private _route:ActivatedRoute,
    private _saleService: SaleService,
    private _loginService:LoginService,
    private _router:Router) {
      this.identity = this._loginService.getIdentity();
    }

  ngOnInit(): void {
    if (this.identity) {
      this.id_entrada = this._route.snapshot.params['id'];
      this.getSale();
    }else{
      this._router.navigate(['']);
    }
  }

  getSale(){
    this._saleService.getSale(this.id_entrada).subscribe(response=>{
      this.sale = response.data.sale;
      this.detail_sale = response.data.details;
    },error =>{

    })
  }
}
