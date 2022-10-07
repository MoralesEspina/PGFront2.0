import { HttpClient } from '@angular/common/http';
import { UserI } from './../models/user.interface';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public url;
  constructor(private _http:HttpClient) {

    this.url = Global.url;
    }

  getUsers(): Observable<any> {
    return this._http.get(this.url + 'users', {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  createUser(form: UserI) {
    return this._http.post(this.url + 'users', form, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  getUser(id): Observable<any> {
    return this._http.get(this.url + 'users/' + id, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  updateUser(form: UserI, id) {
    return this._http.put(this.url + 'rols/' + id, form, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    }  )
  }

  deleteUser(id){
    return this._http.delete(this.url + 'rols/' + id, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  getRols(): Observable<any> {
    return this._http.get(this.url + 'rols', {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

}
