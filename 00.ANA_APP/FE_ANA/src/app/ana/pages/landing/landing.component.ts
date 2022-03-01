import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ANA-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  message = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
