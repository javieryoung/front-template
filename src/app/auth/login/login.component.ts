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
  obs: any;

  constructor(
    private authService: AuthService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    

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

    })
3385
  }

}
