import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validator, Validators} from '@angular/forms';
import { ILogin } from 'src/app/Model/ilogin';
import { IToken } from 'src/app/Model/itoken';
import { JWTService } from 'src/app/Services/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm! : FormGroup;
  constructor(private serv : JWTService , private fb: FormBuilder){}
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: ['',Validators.required],
      Password: ['',Validators.required]
    })
  }

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
    if(this.loginForm.valid){
      console.log(this.loginForm.value);

      //JWT 
      this.serv.login(this.loginuser).subscribe((jwtToken) => {
        localStorage.setItem('jwtToken', this.jwtToken.token);
      })
    }
    else{
      this.ValidateFormFileds(this.loginForm);
      alert("Login Form is Invalid :(");
    }
   
  }

  private ValidateFormFileds(_FormGroup :FormGroup){
    Object.keys(_FormGroup.controls).forEach(field =>{
      const control = _FormGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true})
      }
      else if(control instanceof FormGroup){
        this.ValidateFormFileds(control)
      }
    })
  }
}
