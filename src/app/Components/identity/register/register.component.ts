import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { JWTService } from 'src/app/Services/jwt.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  RegisterForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: JWTService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.RegisterForm = this.fb.group({
      FirstName: ['', Validators.required],
      LastName: ['', Validators.required],
      Email: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  Register() {
    if (this.RegisterForm.valid) {
      this.auth.Register(this.RegisterForm.value).subscribe({
        next: (value) => {
          this.toastr.success(value.message);
          this.RegisterForm.reset();
          this.router.navigate(['login']);
        },
        error: (err) => {
          this.toastr.error(err?.error.message, 'Error :(');   
        },
      });
    } else {
      this.ValidateFormFileds(this.RegisterForm);
      this.toastr.error('Login Form is Invalid');   

    }
  }

  //form validation
  private ValidateFormFileds(_FormGroup: FormGroup) {
    Object.keys(_FormGroup.controls).forEach((field) => {
      const control = _FormGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
        control.updateValueAndValidity();
      } else if (control instanceof FormGroup) {
        this.ValidateFormFileds(control);
      }
    });
  }
}
