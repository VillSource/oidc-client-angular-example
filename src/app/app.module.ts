import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConfig, OAuthModule, OAuthService, OAuthStorage } from 'angular-oauth2-oidc';

const authCodeFlowConfig: AuthConfig = {
  issuer: 'https://localhost:4434/',

  redirectUri: window.location.origin,
  clientId: 'console',
  responseType: 'code',
  scope: ' ', // 'openid profile email offline_access api',
  showDebugInformation: true,

};

function storageFactory() : OAuthStorage{
  try {
    return localStorage;
  } catch {
    return sessionStorage;
  }
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    OAuthModule.forRoot({
      resourceServer: {
        allowedUrls : [
          "https://localhost:4434/me"
        ],
        sendAccessToken: true
      }
    }),
  ],
  providers: [
    {provide: OAuthStorage, useFactory: storageFactory}
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private oauthService: OAuthService) {
    this.oauthService.configure(authCodeFlowConfig);
  }
}
