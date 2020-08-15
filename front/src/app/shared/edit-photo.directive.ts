/**************************************************************************************************/
/*
Add  to a div (which should have an image inside) to add a option to edit the image on hover

Inputs:



css: /assets/sass/edit-photo-directive.scss
*/
/**************************************************************************************************/



import { Directive, ElementRef, ComponentFactoryResolver, ViewContainerRef } from '@angular/core';
import { IconComponent } from './icon/icon.component';

@Directive({
  selector: '[editPhoto]'
})
export class EditPhotoDirective {


  constructor(
    el: ElementRef,
    private vf:ViewContainerRef,
    private componentFactoryResolver:ComponentFactoryResolver,
    
  ) {
    el.nativeElement.style.position = 'relative';
    
    let resolver = this.componentFactoryResolver.resolveComponentFactory(IconComponent);
    let componentFactory =   this.vf.createComponent(resolver);

    

    el.nativeElement.innerHTML += '<div class="edit-photo-backdrop pointer d-flex align-items-center justify-content-center"> <img src="/assets/icons/edit.svg" class="fill-white"> </div>';
  }


}
