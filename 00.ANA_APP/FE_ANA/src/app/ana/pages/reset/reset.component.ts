import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { forgotService } from 'src/app/ana/services/forgot.service';

@Component({
  selector: 'ANA-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.scss']
})
export class ResetComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private forgotService: forgotService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
        password: '',
        password_confirm: ''
    });
  }

  submit(){
    const formData = this.form.getRawValue();
    const data = {
      ...formData,
      token: this.route.snapshot.params['token']
    }
    this.forgotService.resetpassword(data)
      .subscribe(() => this.router.navigate(['/login']));
  }
}
