import { Component } from '@angular/core';
import { ILogin } from 'src/app/Model/ilogin';
import { IToken } from 'src/app/Model/itoken';
import { JWTService } from 'src/app/Services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private serv : JWTService){}

  loginuser : ILogin ={
    email : '',
    password : ''
  }

  jwtToken : IToken = {
    token : '',
    result :true,
    error : ''
  }

  login(){
    this.serv.login(this.loginuser).subscribe((jwtToken) => {
      localStorage.setItem('jwtToken', this.jwtToken.token);
    })
  }
}
