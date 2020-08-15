import { Component, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Noodle';
  inHome: boolean = true;
  padding:number = 280;
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkSize();
  }

  @ViewChild("menu") menu: any;

  constructor(private router: Router, private authService: AuthService) {
    router.events.subscribe((val) => {
      if(val instanceof NavigationEnd) {
        window.scrollTo(0,0);
        this.inHome = val.url == '/';
      }
    });

    setTimeout(() => {
      this.checkSize();
    },5000);
    

  }

  checkSize() {
    let w = document.getElementById('footer').clientHeight;
    this.padding = w;
  }


  toggleMenu() {
    this.menu.toggle();
  }
}
