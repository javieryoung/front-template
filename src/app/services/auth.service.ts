import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { LocalStorageService } from './local-storage.service';
import { HttpService } from './http.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

import {User} from '../models/user';
import 'rxjs/add/operator/do';
// import { AuthService as SocialService, FacebookLoginProvider, GoogleLoginProvider, LinkedinLoginProvider } from 'ng4-social-login';
import { share } from "rxjs/operators"; 


//FULLSTORY STUFF: declare var FS: any;

import { ToastrService } from './toastr.service';

@Injectable()
export class AuthService {

  user:User;
  url:string;
  subject:any;

  socialTrying:boolean = false; // if not set to false, socialService.authState will trigger always, even after a reload after a logout
  socialSubject: any;

  constructor(
    private http: HttpService,
    private apiService: ApiService,
    private localStorage: LocalStorageService,
    // private socialService: SocialService,
    public toast: ToastrService,
    private router: Router,
  ) {

    /*

    this.socialService.authState.subscribe((user) => {
      if (this.socialTrying && user) {
        let res = this.http.post(this.url + '/social_login', user)
          .subscribe(result => {
            this.user = result;
            this.localStorage.setItem('user', this.user);
            this.newUserInTown(result);
            this.socialSubject.next(user);
          }, result => {
            if (result.error.code == 1003) {
              this.toast.error('Error', 'El email ya está en uso');
            } else if (result.error.code == 'wrong-social-network') {
              this.toast.error('Red social equivocada', '¡Parece que ya te registraste con otra red social!')
            } else if (result.error.code == 'already-registered-manual') {
              this.toast.error('Red social equivocada', '¡Parece que ya te registraste con una contraseña! Proba con tu mail y tu contraseña en vez que una red social')
            } else {
              this.toast.error('Error', 'Se produjo un error al ingresar');
            }
          });
      }
    });
    */
    this.subject = new Subject();


    this.url = this.apiService.getUrl() + '/auth';
    this.user = new User().deserialize(this.localStorage.getItem('user'));
    

    if(this.user) {
      this.newUserInTown(this.user);
    }
  }

  currentUserSubject() : Subject<any> {
    return this.subject;
  }


  reloadData() {
    this.http.get(this.url + '/get').subscribe((res) => {
      this.setCurrentUser(res);
    })
  }



  currentUser() : User {
    if (this.user) {
      return this.user;
    } else {
      return null;
    }
  }

  setToken(token) {
    if (!this.user)
      this.user = null;
    this.user.token = token;
    this.localStorage.setItem('user', this.user);
    this.newUserInTown(this.user);
  }


  setCurrentUser(user) {
    let token = null;
    if (this.user)
      token = this.user.token;
    this.user = user;
    this.user.token = token;
    this.localStorage.setItem('user', this.user);
    this.newUserInTown(this.user);
  }

  newUserInTown(what) {
    this.subject.next(what);
    /* FULLSTORY STUFF
    if (what) {
      FS.identify(what.id, {
       displayName: what.name + ' ' + what.last_name,
       email: what.email
      });
    } else {
      FS.identify(false);
    }
    */
  }


  login(credentials) {
    let that = this;
    let res = this.http.post(this.url + '/login', credentials)
      .do((result : User) => {
        this.user = result;
        this.localStorage.setItem('user', this.user);
        that.subject.next(result);
      }).pipe(share());
    return res
  }

  register(data) {
    return this.http.post(this.url + '/register', data).pipe(share());
  }

  logout() {
    this.router.navigateByUrl('/');
    this.user = null;
    this.localStorage.removeItem('user');
    this.newUserInTown(null);
    let auth2 = window['gapi'].auth2.getAuthInstance();
    auth2.signOut().then(function () {
    });
  }

  confirmEmail(token) {
    return this.http.post(this.url + '/confirm_email/' + token, {}).do((result : User) => {
        this.user = result;
        this.localStorage.setItem('user', this.user);
        this.newUserInTown(result);
      });
  }

  recoverPassword(email) {
    return this.http.post(this.url + '/recover_password', {email: email});
  }

  changePasswordRecovering(token, password) {
    return this.http.post(this.url + '/change_password_recovering', {forgot_password_token: token, password: password});
  }

  changePassword(old_password, new_password) {
    return this.http.post(this.url + '/change_password', {old_password: old_password, new_password: new_password});
  }

  /*
  google() {
    this.socialTrying = true;
    this.socialService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.socialSubject = new Subject();
    return this.socialSubject;
  }

  facebook() {
    this.socialTrying = true;
    this.socialService.signIn(FacebookLoginProvider.PROVIDER_ID);
    this.socialSubject = new Subject();
    return this.socialSubject;
  }

  linkedin() {
    this.socialTrying = true;
    this.socialService.signIn(LinkedinLoginProvider.PROVIDER_ID);
    this.socialSubject = new Subject();
    return this.socialSubject;
  }

  */
 
  closeAllSessions() {
    return this.http.post(this.url + '/close_all_sessions', {});
  }


}
