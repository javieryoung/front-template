import { Component, OnChanges, Input } from '@angular/core';
import { PageScrollService } from 'ngx-page-scroll-core';


@Component({
  selector: 'app-error-display',
  templateUrl: './error-display.component.html',
  styleUrls: ['./error-display.component.scss']
})
export class ErrorDisplayComponent implements OnChanges {

  @Input() errors: any;
  constructor(private pageScrollService: PageScrollService) { }

  ngOnChanges() {
    setTimeout(() => {
      this.pageScrollService.scroll({
        document: document,
        scrollTarget: '#target',
      },5);
    })
  }

}
