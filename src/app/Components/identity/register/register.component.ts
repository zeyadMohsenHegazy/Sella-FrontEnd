import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IRegister } from 'src/app/Model/iregister';
import { IToken } from 'src/app/Model/itoken';
import { JWTService } from 'src/app/Services/jwt.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  RegisterForm! : FormGroup;
  constructor(private fb: FormBuilder , private serv : JWTService){}
  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      FirstName: ['',Validators.required],
      LastName: ['',Validators.required],
      Email: ['',Validators.required],
      UserName: ['',Validators.required],
      Password: ['',Validators.required]
    })
  }

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
    if(this.RegisterForm.valid){
      console.log(this.RegisterForm.value);
    }
    else{
      this.ValidateFormFileds(this.RegisterForm);
      alert("Login Form is Invalid :(");
    }
    this.serv.register(this.user).subscribe({
      next : (_token)=>{
        this.Jwttoken = _token;
      },
      error : (err)=> {
        console.log(err);
      }
    })
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
