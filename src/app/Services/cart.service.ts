import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from '../Model/icart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = 'http://localhost:49182/api/Cart';

  constructor(private http: HttpClient) { }

  addCart(data: ICart) {
    return this.http.post(this.apiUrl, data);
  }

  editCart(id: number, data: ICart): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put(url, data);
  }
}
