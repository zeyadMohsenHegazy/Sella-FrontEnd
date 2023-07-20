import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICartProducts } from '../Model/icart-products';
import { Observable } from 'rxjs';
import { IProduct } from '../Model/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CartProductsService {
  apiUrl = 'http://localhost:49182/api/CartProducts';
  constructor(private http: HttpClient) { }

  addCartProduct(data: ICartProducts) {
    return this.http.post(this.apiUrl, data);
  }

  getProductsByCartId(cartId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/${cartId}`);
  }

  delete(cartId: number, productId: number): Observable<any> {
    const url = `${this.apiUrl}/${cartId}/${productId}`;
    return this.http.delete(url);
  }


}
