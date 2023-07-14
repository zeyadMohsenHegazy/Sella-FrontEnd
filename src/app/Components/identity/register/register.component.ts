import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(private fb: FormBuilder , private auth : JWTService, private router: Router){}
  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      FirstName: ['',Validators.required],
      LastName: ['',Validators.required],
      Email: ['',Validators.required],
      UserName: ['',Validators.required],
      Password: ['',Validators.required]
    })
  }


  Register() {
    if(this.RegisterForm.valid){
      this.auth.Register(this.RegisterForm.value)
      .subscribe({
        next : (value)=>{
          alert(value.message);
          this.RegisterForm.reset();
          this.router.navigate(['login']);
        },
        error :(err)=>{
          alert(err?.error.message)
        }
      })
    }
    else{
      this.ValidateFormFileds(this.RegisterForm);
      alert("Login Form is Invalid :(");
    }
  }

  //form validation
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
