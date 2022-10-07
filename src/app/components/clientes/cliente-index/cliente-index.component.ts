import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cliente-index',
  templateUrl: './cliente-index.component.html',
  styleUrls: ['./cliente-index.component.css']
})
export class ClienteIndexComponent implements OnInit {

  public clientes;
  public p: number = 1;

  constructor(
    private _clientService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.getClients();
  }


  getClients(){
    this._clientService.getClients().subscribe(
      response =>{
        this.clientes = response;
      }, error =>{

      }
    )
  }

  deleteClient(id){
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
        this._clientService.deleteClient(id).subscribe(data => {
          Swal.fire(
            'Eliminado!',
            'Cliente Eliminado con Exito',
            'success'
          )
          this.getClients();
        }, error => {
          Swal.fire({
            icon: 'error',
            title: 'No se ha podido eliminar el cliente',
            text: error.error.message,
          })
        });
      }
    })
  }
}
