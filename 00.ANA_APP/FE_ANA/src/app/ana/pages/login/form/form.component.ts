import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { anaService } from 'src/app/ana/services/ana.service';

@Component({
  selector: 'ANA-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  @Output('onLogin') onLogin = new EventEmitter();
  message='';
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private anaService: anaService,
    
  ) {
  }

  ngOnInit(): void {
    this.message='';
    this.form = this.formBuilder.group({
        email: '',
        password: '',
    });
  }

  submit(){
    this.anaService.login(this.form.getRawValue()).subscribe(
      res => this.onLogin.emit(res)
      );
  }
}