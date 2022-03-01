import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
import { NavComponent } from './ana/components/nav/nav.component';
import { AnaInterceptor } from './ana/interceptor/ana.interceptor';
import { LoginComponent } from './ana/pages/login/login.component';
import { RegisterComponent } from './ana/pages/register/register.component';
import { HomeComponent } from './ana/pages/home/home.component';
import { LandingComponent } from './ana/pages/landing/landing.component';
import { ForgotComponent } from './ana/pages/forgot/forgot.component';
import { ResetComponent } from './ana/pages/reset/reset.component';
import { FormComponent } from './ana/pages/login/form/form.component';
import { AuthenticatorComponent } from './ana/pages/login/authenticator/authenticator.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotComponent,
    ResetComponent,
    FormComponent,
    AuthenticatorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AnaInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
