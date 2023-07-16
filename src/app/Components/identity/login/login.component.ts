import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup , Validator, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { JWTService } from 'src/app/Services/jwt.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm! : FormGroup;
  constructor(private fb: FormBuilder , private auth: JWTService, private router : Router , private toastr: ToastrService){}

  ngOnInit(): void {
      this.loginForm = this.fb.group({
      Email: ['',Validators.required],
      Password: ['',Validators.required]
    })
  }

  login(){
    if(this.loginForm.valid){
      //send the Obj to database 
      this.auth.Login(this.loginForm.value)
      .subscribe({
        next:(value)=> {
            this.auth.StoreToken(value.token)
            this.auth.StoreUserId(value.user)
            this.toastr.success(value.message , 'Log in Success');
            this.router.navigate(['home']);
            // get or create user cart id , user id 
        },
        error:(err) => {
            this.toastr.error(err?.error.message, 'Error :(');   
        },
      })
    }
    else{
      this.ValidateFormFileds(this.loginForm);
      this.toastr.error('Login Form is Invalid');   
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
