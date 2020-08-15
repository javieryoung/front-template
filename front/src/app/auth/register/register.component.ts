import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { ToastrService } from '../../services/toastr.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toast: ToastrService,
    private router: Router
  ) { }

  data: any =  {};
  error: any = [];
  obs: any;
  registered: boolean =  false;
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() changeToLogin: EventEmitter<boolean> = new EventEmitter();

  ngOnInit() {
  }
  
  login() {
    if (this.router.url == '/registro') 
      this.router.navigateByUrl('/login');
    else 
      this.changeToLogin.emit(true);
  }

  submitRegister() {
    this.error = [];
    if (!this.data.email || !this.data.name || !this.data.last_name || !this.data.password || !this.data.repeat_password) {
      this.error.push('faltan algunos campos');
      return ;
    }
    if (this.data.email && (this.data.email.indexOf('@') == -1 || this.data.email.indexOf('.') == -1)) {
      this.error.push('el correo electrónco no tiene un formato válido');
      return ;
    }
    if (this.data.password && this.data.password.length < 8) {
      this.error.push('la contraseña debe tener al menos 8 caracteres');
      return ;
    }
    if (this.data.password && (this.data.password != this.data.repeat_password)) {
      this.error.push('las contraseñas no coinciden');
      return ;
    }
    this.obs = this.authService.register(this.data);
    this.obs.subscribe((res) => {
      this.registered = true;
    }, (err) => {
      if (err.error.code == 1003) {
        this.error = ['El mail ya está en uso'];
      } else {
        this.error = ['Error inesperado. Contactarse con los administradores'];
      }
    })
  }

  doLoggedIn() {
    if (this.router.url == '/registro'){
      this.toast.success('¡Bienvenido!', 'Ya iniciaste sesión en Sauce');
      this.router.navigateByUrl('/');
    } else
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
