import { Directive, Input, OnChanges,HostBinding } from '@angular/core';
import { Subscription, Observable } from 'rxjs';

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
      this.inner = '<img src="/assets/loader1.svg" alt="loader" width="50px">';
      this.disabled = true;
      this.observable.subscribe(res => {
        this.disabled = false;
        this.inner = this.content;
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
