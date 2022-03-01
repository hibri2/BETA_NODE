import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { forgotService } from 'src/app/ana/services/forgot.service';

@Component({
  selector: 'ANA-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {
  form!: FormGroup;
  cls = "";
  message = '';

  constructor(
    private formBuilder: FormBuilder,
    private forgotService: forgotService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({

        email: '',
    });
  }

  submit(){
    this.forgotService.forgotpassword(this.form.getRawValue()).subscribe({
      next:() => {
        this.cls = 'success';
        this.message = 'Email was sent!';
        this.form.reset();
        this.router.navigate(['/login']);


      },
      error: () => {
        this.cls = 'danger';
        this.message = 'Error occurred!';
        this.form.reset();
        this.router.navigate(['/']);
      }
      });
  }

}
