import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  ApiUrl:string = 'http://localhost:49182/api/Image/product/';
  constructor(private http:HttpClient) { }

  GetProductImages(ProductId : number){
    return this.http.get<any>(`${this.ApiUrl}${ProductId}`);
  }
}
