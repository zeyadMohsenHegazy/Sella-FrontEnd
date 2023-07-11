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
  RegisterUrl = 'https://localhost:7049/api/AuthMangment/Register';
  LoginUrl = 'https://localhost:7049/api/AuthMangment/Login';
  constructor(private http:HttpClient) { }

  register(user :IRegister) :Observable<IToken>{
    return this.http.post<IToken>(this.RegisterUrl,user);
  }

  login(user :ILogin) :Observable<IToken>{
    return this.http.post<IToken>(this.LoginUrl,user);
  }
}
