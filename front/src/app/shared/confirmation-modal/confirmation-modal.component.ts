import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss']
})
export class ConfirmationModalComponent implements OnInit {

  @Input() public title;
  @Input() public text;
  @Input() public okText;
  @Input() public declineText;
  @Input() public subject;

  constructor() { }

  ngOnInit(): void {
  }

  yes() {
    this.subject.next(true);
  }
  no() {
    this.subject.next(false);
  }

}
