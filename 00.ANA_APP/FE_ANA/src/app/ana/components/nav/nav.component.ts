import { Component, OnInit } from '@angular/core';
import { anaService } from 'src/app/ana/services/ana.service';

@Component({
  selector: 'ANA-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent implements OnInit {
  authenticated = false;

  constructor(
    private anaService: anaService
  ) { 
  }

  ngOnInit(): void {
    anaService.anaEmitter.subscribe(authenticated =>{
      this.authenticated = authenticated
    });
  }

  logout(){
    this.anaService.logout().subscribe(() => {
      this.anaService.accessToken = '';
      anaService.anaEmitter.emit(false)
    })
  }

}
