import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'src/app/services/toastr.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleMenu: any = new EventEmitter();

  user: User;
  constructor(
    private authService: AuthService,
    private toast: ToastrService
  ) {
    this.user = this.authService.currentUser();
    this.authService.currentUserSubject().subscribe((res : User) => {
      this.user = res;
    })
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
