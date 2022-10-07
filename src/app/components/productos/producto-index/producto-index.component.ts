import { ProductoService } from './../../../services/producto.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

declare var jQuery:any;
declare var $:any;

@Component({
  selector: 'app-producto-index',
  templateUrl: './producto-index.component.html',
  styleUrls: ['./producto-index.component.css']
})
export class ProductoIndexComponent implements OnInit {

  public productos;
  public filtro;
  public categorias;
  public name;
  public p: number = 1;

  constructor(
    private _productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getCategorias();
  }


  getProducts(){
    this._productoService.getProducts().subscribe(
      response =>{
        this.productos = response.product;
      }, error =>{

      }
    )
  }
  search(searchForm){
    this._productoService.getProducts
  }

  getCategorias() {
    this._productoService.getCategorias().subscribe(
      response => {
        this.categorias = response;
      }, error => {
      }
    )
  }

  aggCategory(formCategoria){
    if (formCategoria.valid) {
      this._productoService.createCategorias(formCategoria.value).subscribe(
        response  => {
        this.getCategorias();
        $('#modal-save-categoria').modal('hide');
        },
        error  => {

        }
      )
    }
  }

  deleteProduct(id){
    Swal.fire({
      title: 'Estas Seguro?',
      text: "No Podras Revertir esta Acción!",
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'No, Cancelar!',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borralo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._productoService.deleteProduct(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'Producto Eliminado con Exito',
            'success'
          )
          this.getProducts();
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'No se ha podido eliminar el producto',
            text: error.error.message,
          })
        });
      }
    })
  }
}
