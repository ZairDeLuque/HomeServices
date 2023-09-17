//Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

//Social Lib imports
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import { GoogleLoginProvider } from '@abacritt/angularx-social-login';

//Azure Lib imports
import { MSAL_INSTANCE, MsalModule, MsalService } from '@azure/msal-angular';
import { IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser'

//PrimeNG imports
import { ContextMenuModule } from 'primeng/contextmenu';
import { BadgeModule } from 'primeng/badge';
import { TooltipModule } from 'primeng/tooltip';
import { AvatarModule } from 'primeng/avatar'
import { CarouselModule } from 'primeng/carousel';
import { TagModule } from 'primeng/tag'
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { MultiSelectModule } from 'primeng/multiselect'
import { StepsModule } from 'primeng/steps'

//Components imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { HomeComponent } from './bin/stages/home/home.component';
import { NavbarComponent } from './bin/components/navbar/navbar.component';
import { LoginComponent } from './bin/stages/login/login.component';
import { TermsComponent } from './bin/stages/terms/terms.component';
import { InsideHomeComponent } from './bin/stages/inside-home/inside-home.component';
import { FooterComponent } from './bin/components/footer/footer.component';
import { NavbarTinyComponent } from './bin/components/navbar-tiny/navbar-tiny.component';
import { HttpClientModule } from '@angular/common/http';
import { Homestep2Component } from './bin/stages/homestep2/homestep2.component';
import { Homestep3Component } from './bin/stages/homestep3/homestep3.component';
import { ProfileComponent } from './bin/stages/profile/profile.component';

//Azure Method - Microsoft Token Gen
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
    TermsComponent,
    InsideHomeComponent,
    FooterComponent,
    NavbarTinyComponent,
    Homestep2Component,
    Homestep3Component,
    ProfileComponent,
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
    GoogleSigninButtonModule,
    BadgeModule,
    TooltipModule,
    CarouselModule,
    TagModule,
    ButtonModule,
    FormsModule,
    InputTextModule,
    PasswordModule,
    HttpClientModule,
    MultiSelectModule,
    StepsModule,
    AvatarModule
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
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
