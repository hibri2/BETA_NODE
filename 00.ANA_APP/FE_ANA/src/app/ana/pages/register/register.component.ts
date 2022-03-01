import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { anaService } from 'src/app/ana/services/ana.service';

@Component({
  selector: 'ANA-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private anaService: anaService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirm: '', 
    });
  }

  submit(){
    this.anaService.register(this.form.getRawValue()).subscribe(
      () => { 
        this.router.navigate(['/login'])
      }
    );
  }
}