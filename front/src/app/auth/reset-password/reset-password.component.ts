import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from '../../services/toastr.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  token: any;
  password: any;
  repeatPassword: any;
  errors: any = []
  obs: any;

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public toast: ToastrService,
  ) {

    this.activatedRoute.params.subscribe((params: Params) => {
      this.token = params['token'];
    });
  }

  ngOnInit() {
  }

  resetPassword () {
    this.errors = [];
    if (this.password != this.repeatPassword) {
      this.errors.push('Las contraseñas no coinciden');
      return ;
    }
    if (!this.password || this.password.length < 8) {
      this.errors.push('La contraseña debe tener al menos 8 caracteres');
      return ;
    }
    this.authService.changePasswordRecovering(this.token, this.password).subscribe(res => {
      this.toast.success('Correcto', 'La contraseña se cambió correctamente');
      this.authService.setCurrentUser(res);
      this.router.navigateByUrl('/login');
    }, err => {
      this.errors.push('se produjo un error. Intentalo nuevamente');
    });
  }

}
