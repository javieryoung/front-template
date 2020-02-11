import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../services/toastr.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toast: ToastrService
  ) { }

  data: any =  {};
  error: any = [];
  obs: any;
  registered: boolean =  false;

  ngOnInit() {
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
    })
  }
}
