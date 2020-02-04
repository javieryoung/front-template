import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../services/toastr.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  data: any = {};
  error: any = [];
  constructor(
    private authService: AuthService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    

  }

  submit() {
    this.error = [];
    if (!this.data.email || !this.data.name || !this.data.last_name || !this.data.password || !this.data.repeat_password) {
      this.error.push('faltan algunos campos');
    }
    if (this.data.email && (this.data.email.indexOf('@') == -1 || this.data.email.indexOf('.') == -1)) {
      this.error.push('el correo electrónco no tiene un formato válido');
    }
    if (this.data.password && this.data.password.length < 8) {
      this.error.push('la contraseña debe tener al menos 8 caracteres');
    }
    if (this.data.password && (this.data.password != this.data.repeat_password)) {
      this.error.push('las contraseñas no coinciden');
    }
  }

}
