import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from '../../services/toastr.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

  filter: string = '';
  code: string = '';
  obs: any;
  constructor(
    private authService: AuthService,
    private router: Router,
    private toast: ToastrService,
  ) {
  }

  ngOnInit() {
  }

  doFilter(s) {
    if (!this.filter) return true;

    let fs = (this.filter.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase();
    let ss = (s.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toLowerCase();
    return (ss.indexOf(fs) != -1);
  }

}
