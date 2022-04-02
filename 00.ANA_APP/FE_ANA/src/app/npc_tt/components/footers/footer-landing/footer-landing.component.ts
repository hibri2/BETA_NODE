import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'VMS-footer-landing',
  templateUrl: './footer-landing.component.html',
  styleUrls: ['./footer-landing.component.css']
})
export class FooterLandingComponent implements OnInit {
  date = new Date().getFullYear();

  constructor() { }
  
  ngOnInit() {
  }

}