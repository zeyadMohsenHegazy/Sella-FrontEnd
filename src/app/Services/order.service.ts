import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrderProduct } from '../Model/iorder-product';
import { Observable } from 'rxjs';

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

  generateInvoice(Invoice_no: number): Observable<Blob> {
    const url = `http://localhost:49182/api/Orders/GenerateInvoice?Invoice_no=${Invoice_no}`;
    return this.http.get<Blob>(url, { responseType: 'blob' as 'json' });
  }

}
