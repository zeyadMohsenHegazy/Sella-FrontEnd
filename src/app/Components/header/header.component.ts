import { Component, OnInit } from '@angular/core';
import { CartDetialsService } from 'src/app/Services/cart-detials.service';

declare var XMLHttpRequest: new() => XMLHttpRequest;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public totalItem: number = 0;

  constructor(private serve: CartDetialsService) {}

  ngOnInit() {
    this.serve.getProducts().subscribe((res) => {
      this.totalItem = res.length;
    });

    //whatssapp API

    // const data =
    //   "token=glamz1fu79hu4dn0&to=+201555424873&body=WhatsApp API on UltraMsg.com works good";

    // const xhr = new XMLHttpRequest();
    // xhr.withCredentials = false;

    // xhr.addEventListener("readystatechange", function () {
    //   if (this.readyState === this.DONE) {
    //     console.log(this.responseText);
    //   }
    // });

    // xhr.open("POST", "https://api.ultramsg.com/instance49044/messages/chat");
    // xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    // xhr.send(data);
  }
}