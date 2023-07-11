import { Component } from '@angular/core';
import { IRegister } from 'src/app/Model/iregister';
import { IToken } from 'src/app/Model/itoken';
import { JWTService } from 'src/app/Services/jwt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {

  constructor(private serv : JWTService){}

  user : IRegister ={
    name:'',
    email:'',
    password:''
  }

  Jwttoken : IToken ={
    token : '',
    result :true,
    error : ''
  }

  register() {
    this.serv.register(this.user).subscribe({
      next : (_token)=>{
        this.Jwttoken = _token;
      },
      error : (err)=> {
        console.log(err);
      }
    })
  }

}
