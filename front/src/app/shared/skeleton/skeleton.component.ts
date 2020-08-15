import { Component, OnChanges, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';

@Component({
  selector: 'skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss']
})
export class SkeletonComponent implements OnChanges {

  @Input() observable: any;
  hide: boolean = false;
  constructor() {
  }

  ngOnChanges() {
    if (this.observable) {
      this.observable.subscribe(res => {
        this.hide = true;
      })
    }
  }

}
