import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.css']
})
export class UserIndexComponent implements OnInit {

  constructor(private _userService:UserService) { }

  public usuarios;
  public p: number = 1;

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(){
    this._userService.getUsers().subscribe(
      response =>{
        this.usuarios = response.user;
      }, error =>{

      }
    )
  }

  deleteUser(id){
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
        this._userService.deleteUser(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'Producto Eliminado con Exito',
            'success'
          )
          this.getUsers();
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
