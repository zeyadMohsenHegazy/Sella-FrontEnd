import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt'
@Injectable({
  providedIn: 'root'
})
export class JWTService {
  RegisterUrl = 'http://localhost:49182/Register/'; 
  LoginUrl = 'http://localhost:49182/Login/';

  private UserPayload :any;
  constructor(private http:HttpClient, private route:Router) {
   this.UserPayload = this.DecodeToken();
   }

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
 
SignOut(){
   localStorage.removeItem('token');
   localStorage.removeItem('UserID');
   this.route.navigate(['home']);
}

DecodeToken(){
   const JWT = new JwtHelperService();
   const Token = this.GetToken()!;
   console.log(JWT.decodeToken(Token));
   return JWT.decodeToken(Token);
}

GetFullNameFromToken(){
   if(this.UserPayload){
      return this.UserPayload.unique_name;
   }
}


}
