import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BasicPagesRoutingModule } from './basic-pages-routing.module';
import { HomeComponent } from './home/home.component';
import { FaqComponent } from './faq/faq.component';
import { SharedModule } from '../shared/shared.module';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { InlineSVGModule } from 'ng-inline-svg';

@NgModule({
  declarations: [HomeComponent, FaqComponent, DashboardPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    BasicPagesRoutingModule,
    InlineSVGModule.forRoot(),
  ]
})
export class BasicPagesModule { }
