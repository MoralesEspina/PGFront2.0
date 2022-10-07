import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public identity;
  constructor(private loginService: LoginService,
    private _router:Router) {

  }

  ngOnInit(): void {
    this.identity = this.loginService.getIdentity();
  }

  logOut(){
    localStorage.removeItem('identity');
    localStorage.removeItem('token');

    this._router.navigate([''])

  }

}
