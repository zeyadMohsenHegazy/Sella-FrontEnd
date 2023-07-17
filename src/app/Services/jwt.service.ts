import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IRegister } from '../Model/iregister';
import { ILogin } from '../Model/ilogin';
import { Observable } from 'rxjs';
import { IToken } from '../Model/itoken';

@Injectable({
  providedIn: 'root'
})
export class JWTService {
  RegisterUrl = 'http://localhost:49182/Register/';
  
  LoginUrl = 'http://localhost:49182/Login/';
  constructor(private http:HttpClient) { }

 Login(UserObj :any){
    return this.http.post<any>(`${this.LoginUrl}`,UserObj);
 }

 Register(UserObj :any){
  return this.http.post<any>(`${this.RegisterUrl}`,UserObj);
 }


 StoreToken(TokenValue:string){
    localStorage.setItem('token', TokenValue);
 }

 StoreUserId(Id : string){
    localStorage.setItem('UserID', Id);
 }
 GetToken(){
  return localStorage.getItem('token');
 }

 IsLogged():boolean{
    return !!localStorage.getItem('token');
 }
}
