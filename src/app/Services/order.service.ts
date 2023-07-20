import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderProduct } from '../Model/iorder-product';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private apiUrl = 'http://localhost:49182/api/Order';

  private apiUrl2 = 'http://localhost:49182/api/OrderProduct';

  constructor(private http: HttpClient) { }

  addOrder(userId: number) {
    const data = { UserID: userId };
    return this.http.post<number>(this.apiUrl, data);
  }

  addProductOrder(data : IOrderProduct) {
    return this.http.post(this.apiUrl2, data);
  }
}
