import { Router } from '@angular/router';
import { LoginService } from './../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { UserI } from 'src/app/models/user.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user;
  public token;
  public identity;

  constructor(private loginService: LoginService,
    private _router: Router) {
    this.user = new UserI('', '', '', '', '', 0);
    this.identity = this.loginService.getIdentity();
  }

  ngOnInit(): void {
    if(this.identity){
      this._router.navigate(['dashboard'])
    }
  }

  login(loginForm) {
    if (loginForm.valid) {
      this.loginService.login(this.user).subscribe(
        response => {
          this.token = response.token;
          localStorage.setItem('Token', this.token);
          this.loginService.login(this.user, true).subscribe(
            response => {
              localStorage.setItem('identity', JSON.stringify(response.userFound));
              Swal.fire({
                icon: 'success',
                title: 'Inicio de Sesión Exitoso',
                text: 'Bienvenido ' + this.user.username ,
              })
              this._router.navigate(['dashboard']);
            },
            error => {

            })
        },
        error => {
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        })
        }
      )
    } else {

    }
  }
}
