import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private toast: ToastrService) { }

  ngOnInit() {
    

    this.toast.success('holi','siii');

  }

}
