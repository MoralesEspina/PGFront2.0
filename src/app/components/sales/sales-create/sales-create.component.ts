import { LoginService } from './../../../services/login.service';
import { Router } from '@angular/router';
import { SaleService } from './../../../services/sale.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../../services/user.service';
import { ClienteService } from './../../../services/cliente.service';
import { ProductoService } from './../../../services/producto.service';
import { detailSaleI } from 'src/app/models/detailSale.interface';
import { SaleI } from 'src/app/models/detail.interface';



@Component({
  selector: 'app-sales-create',
  templateUrl: './sales-create.component.html',
  styleUrls: ['./sales-create.component.css']
})
export class SalesCreateComponent implements OnInit {

  public identity;
  public clientes: any;
  public venta: any = {
    id_client: '',
  };
  public productos;
  public producto: any = {
    stock: '--|--'
  }
  public total = 0;
  public error_message;
  public success_message;
  public data_detail: Array<any> = [];
  public detail: any = {
    id_product: ''
  };

  constructor(
    private _loginService: LoginService,
    private _clientService: ClienteService,
    private _productoService: ProductoService,
    private _saleService :SaleService,
    private _router:Router
    ) {

  }
  ngOnInit(): void {
    this.getClients();
    this.getProducts();
    this.identity = this._loginService.getIdentity();
  }

  success_alert() {
    this.success_message = '';
  }

  error_alert() {
    this.error_message = '';
  }

  getClients() {
    this._clientService.getClients().subscribe(response => {
      this.clientes = response;
    },
      error => {

      });
  }

  getProducts() {
    this._productoService.getProducts().subscribe(response => {
      this.productos = response.product;
    },
      error => {

      });
  }

  getProduct(id: any) {
    this._productoService.getProduct(id).subscribe(response => {
      this.producto = response;
    }, error => {

    })
  }

  save_detail(detailForm) {
    if (detailForm) {
      if (detailForm.value.quantity == 0) {
        this.error_message = "Agregue una Cantidad"
      } else {
        if (detailForm.value.quantity <= this.producto.stock) {
          this.data_detail.push({
            id_product: detailForm.value.id_product,
            quantity: detailForm.value.quantity,
            name: this.producto.name,
            sale_price: this.producto.sale_price
          });
          this.detail = new detailSaleI('', '', 0);
          this.producto.stock = "--|--";
          this.total = this.total + (parseInt(this.producto.sale_price) * parseInt(detailForm.value.quantity))
        } else {
          this.error_message = "No existe suficiente stock para Venta"
        }
      }
    } else {

    }
  }

  delete(idx, sale_price, quantity) {
    this.data_detail.splice(idx, 1);
    this.total = this.total - (parseInt(sale_price) * parseInt(quantity));
  }

  aggSale(saleForm) {
    if (saleForm.valid) {
      if (saleForm.value.id_client != '') {
        let data ={
          id_client: saleForm.value.id_client,
          id_user: this.identity._id,
          detail: this.data_detail
        }
        this._saleService.creatSale(data).subscribe( response => {
          this._router.navigate(['ventas']);
        },error => {

        });
      } else {
        console.log("error")
      }
    } else {
        console.log("error")
    }
  }
}
