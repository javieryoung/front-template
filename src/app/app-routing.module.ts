import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  // this should be at the end because homepage is here
  { path: '', loadChildren: () => import('./basic-pages/basic-pages.module').then(m => m.BasicPagesModule) },


  { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'editor', loadChildren: () => import('./editor/editor.module').then(m => m.EditorModule) },




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
