import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable()
export class ApiService {

  apiUrl:string;

  constructor() {
    this.apiUrl = environment.apiUrl;
  }

  getUrl(): string {
    return this.apiUrl;
  }

}
