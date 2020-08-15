import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  @Input() total: number = 100;
  @Input() number: number;
  @Input() percent: number;

  constructor() { }

  ngOnInit(): void {
    if (!this.percent){
      this.percent = (this.number * 100) / this.total;
      if (!this.total || !this.number)
        this.percent = 0;
    }
  }

}
