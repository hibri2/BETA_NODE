import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'VMS-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  message = new Date();

  ngOnInit(): void {
  }

}
