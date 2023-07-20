import { Component, OnInit } from '@angular/core';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';
import { JWTService } from 'src/app/Services/jwt.service';
import { UserStoreService } from 'src/app/Services/user-store.service';

declare var XMLHttpRequest: new() => XMLHttpRequest;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
public totalItem : number = 0 ;
public FullName : any;
constructor(private serve : CartDetialsService,private auth : JWTService ,private userStore : UserStoreService){}
IsLogged : boolean = false;
ngOnInit()
{
  this.serve.getProducts().subscribe(res => {
    this.totalItem = res.length;
  })
  this.FullName = this.showuser();
  this.IsLogged = !this.auth.IsLogged();
}

showuser(){
     const FullNameFromToken = this.auth.GetFullNameFromToken();
     return FullNameFromToken;
}

SignOut(){
  this.auth.SignOut();
}


}
