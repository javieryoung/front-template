import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AuthService } from './services/auth.service';
import { ToastrService } from './services/toastr.service';
import { ApiService } from './services/api.service';
import { LocalStorageService } from './services/local-storage.service';
import { MiscService } from './services/misc.service';

import { ToastrModule } from 'ngx-toastr';
import { JasperoConfirmationsModule, ConfirmationService } from '@jaspero/ng-confirmations';

import { SharedModule } from './shared/shared.module'

@NgModule({
  declarations: [
    AppComponent
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
    JasperoConfirmationsModule
  ],
  providers: [
    AuthService,
    ToastrService,
    ApiService,
    LocalStorageService,
    MiscService,
    ConfirmationService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
