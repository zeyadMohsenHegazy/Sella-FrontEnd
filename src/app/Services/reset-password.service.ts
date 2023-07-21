import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ResetPassword } from '../Model/reset-password';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  private baseUrl:string = "http://localhost:49182/api/User";
  constructor(private http: HttpClient) { }

  sendResetPasswordLink(email: string){
    return this.http.post<any>(`${this.baseUrl}/send-reset-email/${email}`,{});
  }

  resetPassword(resetPasswordObject : ResetPassword){
    return this.http.post<any>(`${this.baseUrl}/reset-password`,resetPasswordObject);
  }
}
