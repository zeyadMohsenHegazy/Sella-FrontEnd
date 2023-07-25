import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  openFacebook(): void {
    window.open('https://www.facebook.com', '_blank');
  }

  openTwitter(): void{
    window.open('https://twitter.com', '_blank');
  }

  openYoutube(): void{
    window.open('https://www.youtube.com', '_blank');
  }

  openInsta(): void{
    window.open('https://www.instagram.com', '_blank');
  }

  openGithub(): void{
    window.open('https://github.com/zeyadMohsenHegazy?tab=repositories', '_blank');
  }
}
