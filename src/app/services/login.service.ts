import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from './global';
import { UserI } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url;
  public user;
  public token;
  public identity;

  constructor(private _http:HttpClient,) {
    this.url = Global.url;
    this.user = new UserI('', '','', '', '', 0);
  }

  login(user,getToken = false):Observable<any> {
    let json = user;
    if (getToken != false ) {
      user.getToken = true;
    }

    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.post(this.url + 'auth/signin',json,{headers:headers})
  }

  getToken(){

  }

  getIdentity(): Observable<any> {
    let identity:any;
    identity = JSON.parse(localStorage.getItem("identity")!);
    if (identity) {
      this.identity = identity;
    }else{
      this.identity = null;
    }
    return this.identity;
  }
}

