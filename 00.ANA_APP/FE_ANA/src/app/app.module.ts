import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
/* 
ANA  
*/
import { AnaInterceptor } from './ana/interceptor/ana.interceptor';
import { RegisterComponent } from './ana/pages/register/register.component';
import { LoginComponent } from './ana/pages/login/login.component';
import { FormComponent } from './ana/pages/login/form/form.component';
import { AuthenticatorComponent } from './ana/pages/login/authenticator/authenticator.component';
import { ForgotComponent } from './ana/pages/forgot/forgot.component';
import { ResetComponent } from './ana/pages/reset/reset.component';
/*
ANA - PAGES
*/
import { HomeComponent } from './pages/home/home.component';
import { LandingComponent } from './pages/landing/landing.component';
/* 
ANA - COMPONENTS
*/
import { LandingDropdownComponent } from './pages/components/dropdowns/landing-dropdown/landing-dropdown.component';
import { NavLandingComponent } from './pages/components/navs/nav-landing/nav-landing.component';
import { Scroll2topComponent } from './pages/components/qol/scroll2top/scroll2top.component';
import { FooterLandingComponent } from './pages/components/footers/footer-landing/footer-landing.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    FormComponent,
    AuthenticatorComponent,
    ForgotComponent,
    ResetComponent,
    HomeComponent,
    LandingComponent,
    LandingDropdownComponent,
    NavLandingComponent,
    Scroll2topComponent,
    FooterLandingComponent,
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
