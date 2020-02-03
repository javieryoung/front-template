import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { IconComponent } from './icon/icon.component';
import { HttpClientModule } from '@angular/common/http';
import { InlineSVGModule } from 'ng-inline-svg';
import { MenuComponent } from './menu/menu.component';
import { FooterComponent } from './footer/footer.component';



@NgModule({
  declarations: [NavbarComponent, IconComponent, MenuComponent, FooterComponent],
  imports: [
    CommonModule,
    InlineSVGModule.forRoot(),
    HttpClientModule
  ],
  exports: [
    NavbarComponent, IconComponent, MenuComponent, FooterComponent
  ],
  providers:[HttpClientModule]
})
export class SharedModule { }
