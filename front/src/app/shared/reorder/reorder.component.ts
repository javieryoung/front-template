import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-reorder',
  templateUrl: './reorder.component.html',
  styleUrls: ['./reorder.component.scss']
})
export class ReorderComponent implements OnInit {

  @Input() items: any = [];
  @Input() wat: any;
  @Input() title: string = 'Reordenar elementos';
  @Output() saved: any;

  @ViewChild('content') content: ElementRef;
  
  closeResult: string;
  modalReference: any;

  constructor(private modalService: NgbModal) {
    this.saved = new EventEmitter();
  }

  ngOnInit(): void {
  }

  listSorted(e) {}

  open() {
    this.modalReference = this.modalService.open(this.content, {ariaLabelledBy: 'modal-basic-title'});
  }

  save() {
    this.saved.emit(this.items);
    this.modalReference.close();
  }

}
