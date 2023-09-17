import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './bin/stages/home/home.component';
import { InsideHomeComponent } from './bin/stages/inside-home/inside-home.component';
import { TermsComponent } from './bin/stages/terms/terms.component';
import { LoginComponent } from './bin/stages/login/login.component';
import { ProfileComponent } from './bin/stages/profile/profile.component';
import { Homestep2Component } from './bin/stages/homestep2/homestep2.component';
import { Homestep3Component } from './bin/stages/homestep3/homestep3.component';

const routes: Routes = [
  {path: 'home', component: InsideHomeComponent},
  {path: 'start', component: HomeComponent},
  {path: 'start/information', component: Homestep2Component},
  {path: 'start/verify', component: Homestep3Component},
  {path: 'terms', component: TermsComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile/:uuid', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
