import { ProductoService } from './../../../services/producto.service';
import { Component, OnInit } from '@angular/core';
import { ProductI } from 'src/app/models/product.interface';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-producto-create',
  templateUrl: './producto-create.component.html',
  styleUrls: ['./producto-create.component.css']
})
export class ProductoCreateComponent implements OnInit {

  public producto;
  public categorias;
  public success_msg;
  public error_msg;
  public id;
  public editing: boolean = false;
  public id_entrada;


  constructor(private _productoService: ProductoService,
    private _route: ActivatedRoute,
    private router: Router) {
    this.producto = new ProductI('', '', '', 0, 0, 0);
  }

  ngOnInit(): void {
    this.id_entrada = this._route.snapshot.params['id'];
    this.loadProduct();
    if (this.id_entrada) {

    }else{
      this.getCategorias();
    }
  }

  success_alert() {
    this.success_msg = '';
  }

  error_alert() {
    this.error_msg = '';
  }


  getCategorias() {
    this._productoService.getCategorias().subscribe(
      response => {
        this.categorias = response;
      }, error => {
      }
    )
  }

  loadProduct() {
    if (this.id_entrada) {
      this.editing = true;
      this._productoService.getProduct(this.id_entrada).subscribe(
        response => {
          this.producto = response
          this.getCategorias();
        },
        error => {

        }
      )
    } else {
      this.editing = false;
    }
  }

  aggProduct(productoForm) {
    if (this.editing) {
      const Prod: ProductI = {
        _id: this.id_entrada,
        name: productoForm.value.name,
        id_category: productoForm.value.id_category,
        purchase_price: productoForm.value.purchase_price,
        sale_price: productoForm.value.sale_price,
        stock: productoForm.value.stock,
      }
      if (productoForm.valid) {
        this._productoService.updateProduct(Prod, this.id_entrada).subscribe(
          data => {
            this.success_msg = "Producto Actualizado Correctamente";
          },
          error => {

          })
      } else {
        this.error_msg = 'Complete Correctamente el Formulario';
      }
    } else {
      this.editing = false;
      const Prod: ProductI = {
        _id: '',
        name: productoForm.value.name,
        id_category: productoForm.value.id_category,
        purchase_price: productoForm.value.purchase_price,
        sale_price: productoForm.value.sale_price,
        stock: productoForm.value.stock,
      }
      if (productoForm.valid) {
        this._productoService.createProduct(Prod).subscribe(
          response => {
            console.log()
            this.success_msg = "Se registro el Producto Correctamente";
            this.producto = new ProductI('', '', '', 0, 0, 0);

          }, error => {

          }
        );
      } else {
        this.error_msg = 'Complete Correctamente el Formulario';
      }
    }
  }
}
