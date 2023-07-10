import { Component, OnInit } from '@angular/core';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
public totalItem : number = 0 ;

constructor(private serve : CartDetialsService){}
ngOnInit()
{
  this.serve.getProducts().subscribe(res => {
    this.totalItem = res.length;
  } )
}

 }
