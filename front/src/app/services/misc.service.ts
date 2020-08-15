import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class MiscService {
  url:string;

  constructor(
    private http: HttpService,
    private apiService: ApiService,
  ) {

    this.url = this.apiService.getUrl() + '/misc';
  }

}
