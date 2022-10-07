import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class SaleService {

  public url;

  constructor(private _http: HttpClient,
    ) {
      this.url = Global.url;
    }

    getSales(): Observable<any> {
      return this._http.get(this.url + 'sales', {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    creatSale(data):Observable<any>{
      return this._http.post(this.url + 'sales',data, {
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }

    getSale(id): Observable<any> {
      return this._http.get(this.url + 'sales/'+id,{
        headers: new HttpHeaders({
          'Content-Type':'application/json',
          'x-access-token': '' + localStorage.getItem("Token")
        })
      })
    }
}
