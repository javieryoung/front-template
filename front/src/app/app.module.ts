import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { NgxPageScrollCoreModule } from 'ngx-page-scroll-core';

import { SharedModule } from './shared/shared.module'
import { ToastrModule } from 'ngx-toastr';

import { AuthService } from './services/auth.service';
import { ApiService } from './services/api.service';
import { LocalStorageService } from './services/local-storage.service';
import { MiscService } from './services/misc.service';
import { HttpService } from './services/http.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import {
  SocialLoginModule,
  AuthServiceConfig,
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'ng4-social-login';

import { environment } from '../environments/environment';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
  ],  
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    NgxPageScrollCoreModule.forRoot({duration: 200, scrollOffset:100}),
    FormsModule,
    FontAwesomeModule,
    SocialLoginModule,
  ],
  providers: [
    AuthService,
    ApiService,
    LocalStorageService,
    MiscService,
    HttpService,
    UserService,
    { provide: AuthServiceConfig, useFactory: socialAuthConfig },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


export function socialAuthConfig() {
  return new AuthServiceConfig([
    {
      id: GoogleLoginProvider.PROVIDER_ID,
      provider: new GoogleLoginProvider(environment.googleId)
    },
    {
      id: FacebookLoginProvider.PROVIDER_ID,
      provider: new FacebookLoginProvider(environment.facebookId)
    }
  ], false);

}
