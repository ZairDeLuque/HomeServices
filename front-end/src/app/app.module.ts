import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

import { MSAL_INSTANCE, MsalModule, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser'

import { ContextMenuModule } from 'primeng/contextmenu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './bin/stages/home/home.component';
import { NavbarComponent } from './bin/components/navbar/navbar.component';
import { LoginComponent } from './bin/stages/login/login.component';
import { LoginControllerComponent } from './bin/services/api/login-controller/login-controller.component';
import { TermsComponent } from './bin/stages/terms/terms.component';
import { ReactiveFormsModule } from '@angular/forms';

export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: environment.Azure.clientIDAzure,
      redirectUri: environment.Azure.redirectUrlAzure
    }
  })
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    LoginComponent,
    LoginControllerComponent,
    TermsComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MsalModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ContextMenuModule,
    GoogleSigninButtonModule
  ],
  providers: [
    { 
      provide: 'APP_ENVIRONMENT',
      useValue: environment
    },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              environment.GoogleOauth.clientIDGoogle
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    },
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.reCaptcha.siteKeyCaptcha
      } as RecaptchaSettings
    },
    {provide: MSAL_INSTANCE, useFactory: MSALInstanceFactory},
    MsalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
