import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './bin/stages/home/home.component';
import { InsideHomeComponent } from './bin/stages/inside-home/inside-home.component';
import { TermsComponent } from './bin/stages/terms/terms.component';
import { LoginComponent } from './bin/stages/login/login.component';
import { ProfileComponent } from './bin/stages/profile/profile.component';

const routes: Routes = [
  {path: 'start', component: HomeComponent},
  {path: 'home', component: InsideHomeComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'login', component: LoginComponent},
  {path:'perfil', component: ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
