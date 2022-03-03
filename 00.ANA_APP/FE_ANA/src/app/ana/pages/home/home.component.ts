import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { anaService } from 'src/app/ana/services/ana.service';

@Component({
  selector: 'ANA-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message='';
  unAuth: boolean=false;
  constructor(
    private anaService: anaService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
    this.anaService.user().subscribe({
      next: (res: any) => {
        this.unAuth=false
        this.message = `hi ${res.first_name} ${res.last_name}`
        anaService.anaEmitter.emit(true)

      },
      error: err => {
        this.unAuth=true
        this.message = `You are not Authenticated`
        anaService.anaEmitter.emit(false)
      }
    }
    );
  }

  leave(): void {
    this.anaService.logout().subscribe(
      () => { 
        this.router.navigate(['/login'])
      }
    );
  }
}