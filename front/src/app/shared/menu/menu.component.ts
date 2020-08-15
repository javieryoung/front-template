import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { ToastrService } from 'src/app/services/toastr.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  shown = false;
  accesses: any;
  user: User;
  appName: string = environment.appName;

  constructor(
    private authService: AuthService,
    private toast: ToastrService
  ) {
    this.user = this.authService.currentUser();
    this.authService.currentUserSubject().subscribe((res : User) => {
      this.user = res;
      this.reloadAccesses();
    })
    this.reloadAccesses();
  }

  reloadAccesses() {
    this.authService.getAccesses().then(res => {
      this.accesses = res;
    }) 
  }

  ngOnInit() {
  }

  public toggle() {
    this.shown = !this.shown;
  }

  close() {
    this.shown = false;
  }

  logout() {
    this.toast.modal('Cerrar sesión', '¿Seguro que deseas cerrar sesión?', 'Si', 'No').subscribe(res => {
      if (res) {
        this.authService.logout();
      }
    })
  }
}
