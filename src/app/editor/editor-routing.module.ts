import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorComponent } from './editor.component';
import { EditCourseComponent } from './edit-course/edit-course.component';
import { EditHomeComponent } from './edit-home/edit-home.component';

const routes: Routes = [
  { path: '', component: EditHomeComponent },
  { path: 'curso', component: EditCourseComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
