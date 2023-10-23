import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Components
import { HomeComponent } from './bin/stages/home/home.component';
import { InsideHomeComponent } from './bin/stages/inside-home/inside-home.component';
import { TermsComponent } from './bin/stages/terms/terms.component';
import { LoginComponent } from './bin/stages/login/login.component';
import { ProfileComponent } from './bin/stages/profile/profile.component';
import { Homestep2Component } from './bin/stages/homestep2/homestep2.component';
import { Homestep3Component } from './bin/stages/homestep3/homestep3.component';
import { Homestep4Component } from './bin/stages/homestep4/homestep4.component';
import { ServicesViewComponent } from './bin/stages/services-view/services-view.component';
import { CheckerLoaderComponent } from './bin/stages/checker-loader/checker-loader.component';
import { ConfigComponent } from './bin/stages/config/config.component';
import { ShopsComponent } from './bin/stages/shops/shops.component';
import { NotifysComponent } from './bin/stages/notifys/notifys.component';
import { PrivacyComponent } from './bin/stages/privacy/privacy.component';
import { PaymentComponent } from './bin/stages/payment/payment.component';
import { NotaccountComponent } from './bin/stages/notaccount/notaccount.component';
import { Payment3Component } from './bin/stages/payment3/payment3.component';
import { Payment2Component } from './bin/stages/payment2/payment2.component';
import { NotfoundComponent } from './bin/stages/notfound/notfound.component';

const routes: Routes = [
  {path: '', pathMatch: 'prefix', component: InsideHomeComponent},
  {path: 'start', component: HomeComponent},
  // {path: 'start/information', component: Homestep2Component},
  {path: 'start/verification', component: Homestep3Component},
  {path: 'start/myworkspace', component: Homestep4Component},
  {path: 'terms', component: TermsComponent},
  {path: 'privacy', component: PrivacyComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile/:uuid', component: ProfileComponent},
  // {path: 'articles/:uuid', component: ProductViewComponent},
  {path: 'services/:uuid', component: ServicesViewComponent},
  // {path: 'r/:redirect', component: CheckerLoaderComponent},
  {path: 'myaccount/configuration', component: ConfigComponent},
  {path: 'myaccount/s/owned', component: ShopsComponent},
  {path: 'myaccount/notifications', component: NotifysComponent},
  {path: 'services/buy/payment/method/:id', component: PaymentComponent},
  {path: 'services/buy/payment/address/:id', component: Payment2Component},
  {path: 'services/buy/payment/results/:id', component: Payment3Component},
  {path: 'notaccount', component: NotaccountComponent},
  {path: '**', component: NotfoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
