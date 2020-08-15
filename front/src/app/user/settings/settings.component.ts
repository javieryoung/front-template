import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  user: User;
  @ViewChild("imageUploader") imageUploader: any;

  constructor(private authService:AuthService) {
    this.user = this.authService.currentUser();
   }

  ngOnInit(): void {
  }

}
 