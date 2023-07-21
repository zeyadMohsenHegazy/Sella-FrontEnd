import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ConfirmPasswordValidator } from 'src/app/Helpers/confirmPassword.validator';
import { ResetPassword } from 'src/app/Model/reset-password';
import { ResetPasswordService } from 'src/app/Services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit{
  ResetPasswordForm!: FormGroup;
  emailToReset! : string;
  emailToken! : string;
  resetPasswordObj = new ResetPassword();

  constructor(private fb: FormBuilder, private activatedRout: ActivatedRoute,
     private resetService : ResetPasswordService,
     private toast : ToastrService,
     private router:Router){}
  ngOnInit(): void {
    this.ResetPasswordForm = this.fb.group({
      Password: [null, Validators.required],
      ConfirmPassword: [null, Validators.required]
    },{
      validator: ConfirmPasswordValidator("Password","ConfirmPassword")
    })

    this.activatedRout.queryParams.subscribe(value =>{
      this.emailToReset = value['email'];
      let UrlToken = value['code'];
      this.emailToken = UrlToken.replace(/ /g,'+');
    })
    // this.activatedRout.queryParams.subscribe(value =>{
    //   this.emailToReset = value['email'];
    //   let UrlToken = value['code'];
    //   let tokenArray = UrlToken.split('/');
    //   this.emailToken = tokenArray[0];
    //   console.log(this.emailToken) // take the first part
    // });
  }

  Reset(){
    if(this.ResetPasswordForm.valid){
      this.resetPasswordObj.Email = this.emailToReset;
      this.resetPasswordObj.EmailToken = this.emailToken;
      this.resetPasswordObj.NewPassword = this.ResetPasswordForm.value.Password;
      this.resetPasswordObj.ConfirmPassword = this.ResetPasswordForm.value.ConfirmPassword;
      
      this.resetService.resetPassword(this.resetPasswordObj)
      .subscribe({
        next:(value)=>{
          this.toast.success(value.message)
          this.router.navigate(['login'])
        },
        error:(err)=>{
          this.toast.error(err?.error.message)
        }
      })
    }
  }

}
