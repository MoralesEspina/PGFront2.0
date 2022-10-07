import { UserI } from './../../../models/user.interface';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  public usuario;
  public rols;
  public success_msg;
  public error_msg;
  public id;
  public editing: boolean = false;
  public id_entrada;
  public new_password;

  constructor(private _userService: UserService,
    private _route: ActivatedRoute,) {
      this.usuario = new UserI('', '','', '', '', 0);
    }

  ngOnInit(): void {
    this.id_entrada = this._route.snapshot.params['id'];
    this.loadUser();
    if (this.id_entrada) {

    }else{
      this.getRoles();
    }
  }

  success_alert() {
    this.success_msg = '';
  }

  error_alert() {
    this.error_msg = '';
  }

  getRoles() {
    this._userService.getRols().subscribe(
      response => {
        this.rols = response;
      }, error => {
      }
    )
  }


  loadUser() {
    if (this.id_entrada) {
      this.editing = true;
      this._userService.getUser(this.id_entrada).subscribe(
        response => {
          this.usuario = response
          this.getRoles();
        },
        error => {

        }
      )
    } else {
      this.editing = false;
    }
  }

  aggUser(userForm) {
    if (this.editing) {
      const User: UserI = {
        _id: this.id_entrada,
        name: userForm.value.name,
        phoneNumber : userForm.value.phoneNumber,
        username: userForm.value.username,
        password: userForm.value.password,
        id_rol: userForm.value.id_rol
      }
      if (userForm.valid) {
        this._userService.updateUser(User, this.id_entrada).subscribe(
          data => {
            this.success_msg = "Usuario Actualizado Correctamente";
          },
          error => {

          })
      } else {
        this.error_msg = 'Complete Correctamente el Formulario';
      }
    } else {
      this.editing = false;
        const User: UserI = {
          _id: '',
          name: userForm.value.name,
          phoneNumber : userForm.value.phoneNumber,
          username: userForm.value.username,
          password: userForm.value.password,
          id_rol: userForm.value.id_rol
        }
      if (userForm.valid) {
        this._userService.createUser(User).subscribe(
          response => {
            console.log()
            this.success_msg = "Se registro el Usuario Correctamente";
            this.usuario = new UserI('', '','', '', '', 0);
          }, error => {

          }
        );
      } else {
        this.error_msg = 'Complete Correctamente el Formulario';
      }
    }
  }
}
