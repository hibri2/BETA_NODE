import { Component, OnInit } from '@angular/core';
import { anaService } from 'src/app/ana/services/ana.service';

@Component({
  selector: 'ANA-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  message='';
  constructor(
    private anaService: anaService
  ) { 
  }

  ngOnInit(): void {
    this.anaService.user().subscribe({
      next: (res: any) => {
        this.message = `hi ${res.first_name} ${res.last_name}`
        anaService.anaEmitter.emit(true)
      },
      error: err => {
        this.message = `You are not Authenticated`
        anaService.anaEmitter.emit(false)
      }
    }
    );
  }

}