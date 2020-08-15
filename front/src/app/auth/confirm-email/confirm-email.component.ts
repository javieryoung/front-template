
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from '../../services/toastr.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  status: any;
  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    public toast: ToastrService,
  ) {
  }

  ngOnInit() {
    this.status = 'waiting';
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params['token']) {

        this.authService.confirmEmail(params['token']).subscribe(res => {
            this.status = 'success';
            this.toast.success('Correcto', 'Confirmación de email completa');
          }, error => {
            this.status = 'error';
            this.toast.error('Error', 'Error al confirmar el mail');
          })

      }

    });
  }

}
