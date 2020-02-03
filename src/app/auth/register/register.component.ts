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


  ngOnInit() {
  }

  submit() {
    console.log(this.data);
  }
}
