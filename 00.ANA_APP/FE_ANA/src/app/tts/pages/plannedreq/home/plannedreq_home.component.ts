import { Component, OnInit } from '@angular/core';
import { ttsService } from 'src/app/tts/services/tts.service';
import { PlannedReqListModel } from './plannedreq_datamodel.model';

@Component({
  selector: 'TTS-home',
  templateUrl: './plannedreq_home.component.html',
  styleUrls: ['./plannedreq_home.component.css']
})
export class plannedreq_homeComponent implements OnInit {
  message='HOLA';
  PlannedReqArray: any[] = [];
  constructor(
    private ttsService: ttsService,
  ) { 
  }


  ngOnInit(): void {
    this.getBEData();
  }

  getBEData(){
    this.ttsService.listplannedreq().subscribe((res) => {
      this.PlannedReqArray = res as PlannedReqListModel[];
      console.log(this.PlannedReqArray);
    });
  }
}
