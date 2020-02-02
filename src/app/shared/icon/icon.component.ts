import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class IconComponent implements OnInit {


  
  @Input() icon: string = '';
  @Input() color: string = 'dark';


  constructor( private sanitizer: DomSanitizer) {
  }

  getUrl() {
    return ('/assets/icons/' + this.icon + '.svg');
  }
  ngOnInit(){}

}
