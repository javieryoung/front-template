import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom
})
export class IconComponent implements OnInit {

  @Input() icon: string = '';
  @Input() color: string = 'dark';
  @Input() size: string = 'normal';
  @Input() social: boolean = false;

  constructor() {
  }

  ngOnInit(){
    if (['facebook', 'instagram', 'linkedin', 'youtube'].indexOf(this.icon) != -1) {
      this.social = true;
    }
  }

}
