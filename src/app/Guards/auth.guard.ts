import { JWTService } from 'src/app/Services/jwt.service';
import { ToastrService } from 'ngx-toastr';
import { RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(private jwtService: JWTService, private toastr: ToastrService, private router :Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.jwtService.IsLogged()) {
      return true;  
    } else {
      this.toastr.error("Please Login First!");
      this.router.navigate(['login']);
      return false;
    }
  }
}