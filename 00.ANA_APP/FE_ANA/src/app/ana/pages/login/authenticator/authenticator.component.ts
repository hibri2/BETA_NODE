import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { anaService } from 'src/app/ana/services/ana.service';

@Component({
  selector: 'ANA-authenticator',
  templateUrl: './authenticator.component.html',
  styleUrls: ['./authenticator.component.css']
})
export class AuthenticatorComponent implements OnInit {
  @Input('loginData') LoginData = {
    id: 0,
    xQrCode:'',
  };
  getxQrCode='';
  message='';
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private anaService: anaService
  ) {}

  ngOnInit(): void {
    this.message='';
    this.form = this.formBuilder.group({
        code: '',
    });
  }

  submit(){
    const  formData = this.form.getRawValue();
    const data = this.LoginData;

    this.anaService.authenticatorLogin({
      ...data,
      ...formData
    }).subscribe(
      (res: any) => {
        this.anaService.accessToken = res.token;
        anaService.anaEmitter.emit(true);
        this.router.navigate(['/home'])
      }
      );
  }
  getQR(){
    const data = this.LoginData;
    this.anaService.get2faqr({
      ...data,
    }).subscribe(
      (res: any) => {
        this.getxQrCode = res.otpauth_url;
        console.log(this.getxQrCode);
      }
      );
  }
}