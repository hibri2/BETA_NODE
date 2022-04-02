import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgotComponent } from './ana/pages/forgot/forgot.component';
import { LoginComponent } from './ana/pages/login/login.component';
import { RegisterComponent } from './ana/pages/register/register.component';
import { ResetComponent } from './ana/pages/reset/reset.component';
import { LandingComponent } from './npc_tt/pages/landing/landing.component';
import { HomeComponent } from './npc_tt/pages/home/home.component';
import { plannedreq_homeComponent } from './tts/pages/plannedreq/home/plannedreq_home.component';

const routes: Routes = [
  /* 
  ANA POINTS 
  */
  {path:'login', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'forgot', component:ForgotComponent},
  {path:'reset/:token', component:ResetComponent},
  /* 
  NPC-TT POINTS 
  */
  {path:'', component:LandingComponent},
  {path:'home', component:HomeComponent},
  /* 
  TTS POINTS 
  */
  {path:'plannedreq', component:plannedreq_homeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
