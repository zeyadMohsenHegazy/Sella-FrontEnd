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
public FullName :any;
constructor(private serve : CartDetialsService,private auth : JWTService ,private userStore : UserStoreService){}
ngOnInit()
{
  this.serve.getProducts().subscribe(res => {
    this.totalItem = res.length;
  })

}

showuser(){
  
  this.FullName = this.userStore.GetFullNameFromStore()
  .subscribe(value =>{
    const FullNameFromToken = this.auth.GetFullNameFromToken();
    this.FullName = value || FullNameFromToken
    alert(this.FullName);
  });
}
}
