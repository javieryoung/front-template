
/**************************************************************************************************/
/*
Add this to a button within a form to make a loading animation after its submitted

Inputs:
ovservable: you need to pass an "observable" to let this know when to stop showing the animation
content: the text that will be in the button
*/
/**************************************************************************************************/


import { Directive, Input, OnChanges,HostBinding } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[showLoading]'
})
export class LoadingDirective implements OnChanges{

  @Input() observable: Observable<any>;
  @Input() content: string;
  @HostBinding('innerHTML') inner; 
  @HostBinding('disabled') disabled = false;

  constructor() {}

  ngOnChanges() {
    if (this.observable) {
      this.inner = '<img src="/assets/loader.svg" alt="loader" width="50px">';
      this.disabled = true;
      this.observable.subscribe(res => {
        this.disabled = false;
        this.inner = this.content;
      }, err => {
        this.disabled = false;
        this.inner = this.content;
      })
    }
    if (!this.inner)
      this.inner = this.content;
  }

}
