import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.test';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleMenu: any = new EventEmitter();

  accesses: any;
  user: User;
  url : string;
  cart: any[];
  appName:string = environment.appName;

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router,
  ) {
    this.user = this.authService.currentUser();
    this.authService.currentUserSubject().subscribe((res : User) => {
      this.user = res;
    })
    this.url = this.router.url;
  }

  ngOnInit() {
  }

  menu() {
    this.toggleMenu.emit(true);
  }

  logout() {
    this.toast.modal('Cerrar sesión', '¿Seguro que deseas cerrar sesión?', 'Si', 'No').subscribe(res => {
      if (res) {
        this.authService.logout();
      }
    })
  }

}
