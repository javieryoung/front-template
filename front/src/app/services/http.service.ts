import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpEventType } from '@angular/common/http';
import {LocalStorageService} from './local-storage.service';
import {ToastrService} from './toastr.service';
import { Subject } from 'rxjs';
import { share, publishReplay, refCount } from "rxjs/operators"; 

@Injectable()
export class HttpService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private toastrService: ToastrService
  ) {}

  buildHeaders (h) : any {
    let toAdd = {};
    if (this.localStorage.getItem('user')) {
      let authToken = this.localStorage.getItem('user')["token"];
      toAdd['Authorization'] = 'Basic ' + authToken;

    }
    if (h) {
      for (let key in h) {
        toAdd[key.toString()] = h[key].toString();
      }
    }

    let headers = new HttpHeaders(toAdd);
    return headers;
  }


  get(url, headers? : {}) {
    let h = {
      headers: this.buildHeaders(headers)
    }
    return this.http.get(url, h).pipe(share())
      .do((res) => {

      }, (error) => {
        if (error.error.code == 1004 && this.localStorage.getItem('user')) {
          this.localStorage.removeItem('user');
          this.toastrService.error('Error', 'Tu sesión expiró');
          // window.location.reload();
        }
      });
  }

  getWithProgress(url, headers? : {}) {
    let h = {
      headers: this.buildHeaders(headers),
      reportProgress: true
    }
    let request = new HttpRequest('GET', url, h);
    let s = new Subject();
    this.http.request(request).subscribe(event => {
      if (event.type === HttpEventType.DownloadProgress) {
        s.next({ status: 'transfering', 'loaded': event.loaded});
      }

      if (event.type === HttpEventType.Response) {
        s.next({ status: 'finished', 'body': event.body});
        s.complete();
      }

    }, error => {
      if (error.error.code == 1004 && this.localStorage.getItem('user')) {
        this.localStorage.removeItem('user');
        this.toastrService.error('Error', 'Tu sesión expiró');
        // window.location.reload();
      }
      s.error(error);
    })
    return s.pipe(share());
  }



  post(url, data, headers? : {}, options?: {}) {
    let h = {
      headers: this.buildHeaders(headers)
    }
    if (options) {
      Object.keys(options).forEach(function (key) { 
        var value = options[key];
        h[key] = value;
      })
    }
    return this.http.post(url, data, h).pipe(publishReplay(1), refCount())
      .do((res) => {

      }, (error) => {
        if (error && error.error && error.error.code == 1004 && this.localStorage.getItem('user')) {
          this.localStorage.removeItem('user');
          this.toastrService.error('Error', 'Tu sesión expiró');
          // window.location.reload();
        }
      });
  }

}
