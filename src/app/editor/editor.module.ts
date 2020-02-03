import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditHomeComponent } from './edit-home/edit-home.component';


@NgModule({
  declarations: [EditorComponent, EditCourseComponent, EditHomeComponent],
  imports: [
    CommonModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
