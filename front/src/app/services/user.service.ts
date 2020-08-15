import { HttpService } from './http.service';
import { ApiService } from './api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url:string;

  constructor(
    private httpService: HttpService,
    private apiService: ApiService,
  ) {

    this.url = this.apiService.getUrl() + '/user';
  }

  updateProfile(p) {
    return this.httpService.post(this.url + '/update_profile', p);
  }

  uploadProfilePicture(formData) {
    return this.httpService.post(this.url + '/upload_profile_picture', formData, {});
  }

  updatePassword(p, np) {
    return this.httpService.post(this.url + '/update_password', {password:p, new_password: np});
  }

}
