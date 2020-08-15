import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { environment } from 'src/environments/environment';
import { trigger } from '@angular/animations';
import { fadeIn } from 'src/app/animations/fadeIn';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations : [
    trigger('fadeIn', fadeIn())
  ]
})
export class HomeComponent implements OnInit {

  appName: string = environment.appName;
  category: string = 'todos';
  constructor(
    private router: Router, 
    private authService: AuthService,
  ) { 
  }

  ngOnInit() {
  }

}
