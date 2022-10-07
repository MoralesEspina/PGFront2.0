import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ClientI } from '../models/client.interface';
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  public url;

  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getClients(): Observable<any> {
      return this._http.get(this.url + 'clients', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    createClient(form: ClientI) {
      return this._http.post(this.url + 'clients', form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getClient(id): Observable<any> {
      return this._http.get(this.url + 'clients/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    updateClient(form: ClientI, id) {
      return this._http.put(this.url + 'clients/' + id, form, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    deleteClient(id){
      return this._http.delete(this.url + 'clients/' + id, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

}
