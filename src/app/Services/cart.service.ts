import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICart } from '../Model/icart';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  apiUrl = 'http://localhost:49182/api/Cart';
  constructor(private http: HttpClient) { }

  addCart(data: ICart) {
    return this.http.post(this.apiUrl, data);
  }
}
