import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'VMS-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  collapseShow = '';
  constructor() { }

  ngOnInit() {
  }
  toggleCollapseShow(classes: any) {
    this.collapseShow = classes;
  }
}