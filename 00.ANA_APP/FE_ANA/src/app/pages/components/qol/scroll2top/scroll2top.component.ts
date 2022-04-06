import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'ANA-scroll2top',
  templateUrl: './scroll2top.component.html',
  styleUrls: ['./scroll2top.component.css']
})
export class Scroll2topComponent implements OnInit {

  isShow=false;
  topPosToStartShowing = 100;

  constructor() { }

  @HostListener('window:scroll')
  checkScroll() {

    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    
    if (scrollPosition >= this.topPosToStartShowing) {
      this.isShow = true;
    } else {
      this.isShow = false;
    }
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }

  ngOnInit(): void {
  }

}
