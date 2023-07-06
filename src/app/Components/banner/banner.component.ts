import { Component, OnInit } from '@angular/core';
declare var $: any;
declare var jQuery: any;

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})

export class BannerComponent implements OnInit{
  constructor() { }

  ngOnInit(): void {
    // Add the owlCarousel initialization code here
    $('.owl-carousel').owlCarousel({
      loop:true,
      margin:10,
      nav:true,
      responsive:{
        0:{
          items:1
        },
        600:{
          items:3
        },
        1000:{
          items:3
        }
      }
    });
  }
}
