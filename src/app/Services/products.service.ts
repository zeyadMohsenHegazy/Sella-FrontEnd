import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../Model/IProduct';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  // url of the API
  baseUrl: string = 'http://localhost:49182/';
  constructor( private http: HttpClient) { }

  // Function to get all the products from the API
  GetAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.baseUrl + 'api/Product');
  }

  //Function to get a single product from the API
  GetProductoById(id : number){
    return this.http.get<IProduct>(this.baseUrl + 'api/product/' + id);
  }

  //function to get the products of the given category from the API
  GetAllProductsByCategory(categoryId : number){
    return  this.http.get<IProduct[]>(this.baseUrl + 'api/ProductsOnCategory/' + categoryId);
  }
}
