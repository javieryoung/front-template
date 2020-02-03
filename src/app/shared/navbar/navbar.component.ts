import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Output() toggleMenu: any = new EventEmitter();


  constructor() { }

  ngOnInit() {
  }

  menu() {
    this.toggleMenu.emit(true);
  }

}
