import { Component, OnInit, Output, EventEmitter, ViewChild, Input, ElementRef, ViewEncapsulation } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'editable',
  templateUrl: './editable.component.html',
  styleUrls: ['./editable.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditableComponent implements OnInit {

  @Input() content: string;
  @Input() type: string;
  @ViewChild('input') input: ElementRef;

  editing:boolean = false;
  edited: any = '';
  @Output() changed: any;

  public Editor = ClassicEditor;

  constructor() {
    this.changed = new EventEmitter();
  }

  ngOnInit() {
    this.edited = this.content;
  }

  edit() {
    this.editing = true;
    if (this.type != 'editor') {
      setTimeout(() => {
        this.input.nativeElement.focus();
      }, 5);
    }
  }


  blur() {
    if (document.getElementsByClassName('ck-link-form').length) 
      return ;
    this.editing = false;
    this.changed.emit(this.edited)
  }

  onEditorReady($event: any) {
    $event.editing.view.focus();
  }




}
