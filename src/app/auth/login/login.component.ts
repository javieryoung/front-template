import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../services/toastr.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private toast: ToastrService
  ) { }

  ngOnInit() {
    

  }

}
