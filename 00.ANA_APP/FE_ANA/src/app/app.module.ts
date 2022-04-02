import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { QRCodeModule } from 'angularx-qrcode';
/* 
VMS - ANA  
*/
import { AnaInterceptor } from './ana/interceptor/ana.interceptor';
import { LoginComponent } from './ana/pages/login/login.component';
import { RegisterComponent } from './ana/pages/register/register.component';
import { ForgotComponent } from './ana/pages/forgot/forgot.component';
import { ResetComponent } from './ana/pages/reset/reset.component';
import { FormComponent } from './ana/pages/login/form/form.component';
import { AuthenticatorComponent } from './ana/pages/login/authenticator/authenticator.component';
/* 
NPC-TT - PAGES  
*/
import { LandingComponent } from './npc_tt/pages/landing/landing.component';
import { HomeComponent } from './npc_tt/pages/home/home.component';
/* 
NPC-TT - COMPONENTS  
*/
import { SidebarComponent } from './npc_tt/components/sidebar/sidebar.component';
import { IndexDropdownComponent } from './npc_tt/components/dropdowns/index-dropdown/index-dropdown.component';
import { NotificationDropdownComponent } from './npc_tt/components/dropdowns/notification-dropdown/notification-dropdown.component';
import { PagesDropdownComponent } from './npc_tt/components/dropdowns/pages-dropdown/pages-dropdown.component';
import { TableDropdownComponent } from './npc_tt/components/dropdowns/table-dropdown/table-dropdown.component';
import { UserDropdownComponent } from './npc_tt/components/dropdowns/user-dropdown/user-dropdown.component';
import { LandingDropdownComponent } from './npc_tt/components/dropdowns/landing-dropdown/landing-dropdown.component';
import { HeaderStatsComponent } from './npc_tt/components/header-stats/header-stats.component';
import { CardStatsComponent } from './npc_tt/components/cards/card-stats/card-stats.component';
import { FooterHomeComponent } from './npc_tt/components/footers/footer-home/footer-home.component';
import { FooterLandingComponent } from './npc_tt/components/footers/footer-landing/footer-landing.component';
import { HeaderLandingComponent } from './npc_tt/components/headers/header-landing/header-landing.component';
import { Scroll2topComponent } from './npc_tt/components/qol/scroll2top/scroll2top.component';
import { NavLandingComponent } from './npc_tt/components/navs/nav-landing/nav-landing.component';
/* 
VMS - PAGES  
*/
import { DashboardComponent } from './vms/pages/home/dashboard/dashboard.component';
import { AddsupplierComponent } from './vms/pages/home/suppliers/forms/addsupplier/addsupplier.component';
/* 
TTS - PAGES  
*/
import { plannedreq_homeComponent } from './tts/pages/plannedreq/home/plannedreq_home.component'


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgotComponent,
    ResetComponent,
    FormComponent,
    AuthenticatorComponent,
    SidebarComponent,
    LandingComponent,
    IndexDropdownComponent,
    NotificationDropdownComponent,
    PagesDropdownComponent,
    TableDropdownComponent,
    UserDropdownComponent,
    LandingDropdownComponent,
    HeaderStatsComponent,
    CardStatsComponent,
    FooterHomeComponent,
    FooterLandingComponent,
    HeaderLandingComponent,
    DashboardComponent,
    AddsupplierComponent,
    Scroll2topComponent,
    NavLandingComponent,
    plannedreq_homeComponent,
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
