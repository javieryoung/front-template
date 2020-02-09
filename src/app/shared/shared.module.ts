import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { IconComponent } from './icon/icon.component';
import { InlineSVGModule } from 'ng-inline-svg';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';

import { RouterModule } from '@angular/router';


import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ErrorDisplayComponent } from './error-display/error-display.component';
import { LoadingDirective } from './loading.directive';


@NgModule({
  declarations: [NavbarComponent, IconComponent, MenuComponent, FooterComponent, ErrorDisplayComponent, LoadingDirective],
  imports: [
    CommonModule,
    InlineSVGModule.forRoot(),
    RouterModule,
    HttpClientModule,
  ],
  exports: [
    NavbarComponent, IconComponent, MenuComponent, FooterComponent, ErrorDisplayComponent,LoadingDirective
  ],
  providers: [
  ],
})
export class SharedModule { }
