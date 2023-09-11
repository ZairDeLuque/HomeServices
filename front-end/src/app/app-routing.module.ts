import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './bin/stages/home/home.component';
import { InsideHomeComponent } from './bin/stages/inside-home/inside-home.component';
import { TermsComponent } from './bin/stages/terms/terms.component';
import { ProductViewComponent } from './bin/stages/product-view/product-view.component';
import { ProfileComponent } from './bin/stages/profile/profile.component';

const routes: Routes = [
  {path: 'start', component: HomeComponent},
  {path: 'home', component: InsideHomeComponent},
  {path: 'terms', component: TermsComponent},
  {path: 'perfil', component:ProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
