import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MSAL_INSTANCE, MsalModule, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.clientIDAzure,
      redirectUri: environment.redirectUrlAzure
    }
  })
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MsalModule
  ],
  providers: [
    {provide: 'APP_ENVIRONMENT', useValue: environment},
    {provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory},
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
