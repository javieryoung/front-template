import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { IconComponent } from './icon/icon.component';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';



@NgModule({
  declarations: [NavbarComponent, IconComponent],
  imports: [
    CommonModule,
    InlineSVGModule.forRoot(),
    HttpClientModule
  ],
  exports: [
    NavbarComponent, IconComponent
  ],
  providers:[HttpClientModule]
})
export class SharedModule { }
