import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './ana/pages/forgot/forgot.component';
import { HomeComponent } from './ana/pages/home/home.component';
import { LandingComponent } from './ana/pages/landing/landing.component';
import { Get2FAComponent } from './ana/pages/login/authenticator/get2-fa/get2-fa.component';
import { LoginComponent } from './ana/pages/login/login.component';
import { RegisterComponent } from './ana/pages/register/register.component';
import { ResetComponent } from './ana/pages/reset/reset.component';

const routes: Routes = [
  {path:'', component:LandingComponent},
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'home', component:HomeComponent},
  {path:'forgot', component:ForgotComponent},
  {path:'reset/:token', component:ResetComponent},
  {path:'get2FAQR', component:Get2FAComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }