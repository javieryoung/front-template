import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicPagesRoutingModule } from './basic-pages-routing.module';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';


@NgModule({
  declarations: [HomeComponent, FaqComponent],
  imports: [
    CommonModule,
    BasicPagesRoutingModule
  ]
})
export class BasicPagesModule { }
