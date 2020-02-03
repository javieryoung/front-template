import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  shown = false;
  constructor() { }

  ngOnInit() {
  }

  public toggle() {
    this.shown = !this.shown;
  }
}
