import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ANA-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  message = new Date();
  constructor() { }

  ngOnInit(): void {
  }

}
