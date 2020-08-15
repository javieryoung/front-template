import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastrService } from '../../services/toastr.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

import { PageScrollService } from 'ngx-page-scroll-core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: any = {};
  error: any = [];
  obs: any;
  recoveringPassword: boolean = false;
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  register: boolean = false;

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router,
    private pageScrollService: PageScrollService
  ) { }

  ngOnInit() {
    

  }

  scrollTop() {
    setTimeout(() => {
      this.pageScrollService.scroll({
        document: document,
        scrollTarget: '#target1',
      });
    },5)
  }

  submitLogin() {
    this.error = [];
    if (!this.data.email || !this.data.password) {
      this.error.push('faltan algunos campos');
      return ;
    }
    if (this.data.email && (this.data.email.indexOf('@') == -1 || this.data.email.indexOf('.') == -1)) {
      this.error.push('el correo electrónco no tiene un formato válido');
      return ;
    }

    this.obs = this.authService.login(this.data);
    this.obs.subscribe((res) => {
      this.doLoggedIn();
    }, (err) => {
      if (err.error.code == 1012) {
        this.error = ['Es necesario que valides tu mail para iniciar sesión'];
      } else if (err.error.code == 1004) {
        this.error = ['Usuario o contraseña incorrectos'];
      } else {
        this.error = ['Error inesperado. Contactarse con los administradores'];
      }
    });
  }
  
  recoverPassword() {
    this.error = [];
    if (!this.data.email) {
      this.error.push('falta completar el mail');
      return ;
    }

    this.obs = this.authService.recoverPassword(this.data.email);
    this.obs.subscribe((res) => {
      this.toast.info('Te enviamos un mail', 'Con instrucciones para resetear tu contraseña');
      this.recoveringPassword = false;
    }, (err) => {
      this.error = ['Error inesperado. Contactarse con los administradores'];
    });
  }

  changeToLogin() {
    this.register = false; 
    this.scrollTop();
  }

  doLoggedIn() {
    this.toast.success('¡Bienvenido!', 'Ya iniciaste sesión en Sauce');
    if (this.router.url == '/login')
      this.router.navigateByUrl('/');
    else
      this.loggedIn.emit(true);
  }

  facebook(): void {
    this.authService.facebook().subscribe(res => {
      this.doLoggedIn();
    });
  }

  google(): void {
    this.authService.google().subscribe(res => {
      this.doLoggedIn();
    });
  }


}
