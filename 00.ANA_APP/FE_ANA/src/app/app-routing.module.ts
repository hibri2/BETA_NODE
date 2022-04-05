import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './ana/pages/login/login.component';
import { RegisterComponent } from './ana/pages/register/register.component';
import { ForgotComponent } from './ana/pages/forgot/forgot.component';
import { ResetComponent } from './ana/pages/reset/reset.component';

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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
