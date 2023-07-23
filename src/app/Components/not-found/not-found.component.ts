import { Component, OnInit } from '@angular/core';

declare class Parallax {
  constructor(element: HTMLElement);
}

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  scene!: HTMLElement | null;

  constructor() {}

  ngOnInit(): void {
    this.scene = document.getElementById('scene');
    if (this.scene) {
      let parallax: Parallax = new Parallax(this.scene);
    }
  }
}