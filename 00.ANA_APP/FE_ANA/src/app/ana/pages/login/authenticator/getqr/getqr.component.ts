import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { anaService } from 'src/app/ana/services/ana.service';

@Component({
  selector: 'ANA-getqr',
  templateUrl: './getqr.component.html',
  styleUrls: ['./getqr.component.scss']
})
export class GetqrComponent implements OnInit {
  xQrCode ='';
  message = '';
  @Input('loginData') LoginData = {
    id: 0,
    password:'',
  };

  constructor(
    private router: Router,
    private anaService: anaService
  ) {}

  ngOnInit(): void {
      const data = this.LoginData;
  
      this.anaService.get2faqr({
      ...data,
      }).subscribe(
        (res: any) => {
          this.xQrCode = res.otpauth_url;
          if(this.xQrCode){
            this.message = "WHUT";
          }
        }
    );
  }
}
