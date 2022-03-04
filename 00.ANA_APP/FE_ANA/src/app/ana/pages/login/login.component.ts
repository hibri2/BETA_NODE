import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ANA-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  loginData = {
    id: 0,
    password:'',
    xQrCode:'',
  }

  ngOnInit(): void {
      
  }
  onLogin(data: any){
    this.loginData = data;
    
    if(data.otpauth_url){
      this.loginData.xQrCode = data.otpauth_url;
    }
  }
}