import { ProductI } from 'src/app/models/product.interface';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Global } from './global';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  public url;

  constructor(
    private _http: HttpClient,
  ) {
    this.url = Global.url;
  }

  getProducts(): Observable<any> {
    return this._http.get(this.url + 'products', {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  createProduct(form: ProductI) {
    return this._http.post(this.url + 'products', form, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  getProduct(id): Observable<any> {
    return this._http.get(this.url + 'products/' + id, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  updateProduct(form: ProductI, id) {
    return this._http.put(this.url + 'products/' + id, form, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  deleteProduct(id){
    return this._http.delete(this.url + 'products/' + id, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  getCategorias(): Observable<any> {
    return this._http.get(this.url + 'category', {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }

  createCategorias(data) {
    return this._http.post(this.url + 'category', data, {
      headers: new HttpHeaders({
        'Content-Type':'application/json',
        'x-access-token': '' + localStorage.getItem("Token")
      })
    })
  }


}
