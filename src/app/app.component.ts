import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  me = this.httpClient.get("https://localhost:4434/me");

  constructor(private oauthService: OAuthService, private httpClient:HttpClient) {}

  ngOnInit(): void {
    this.oauthService.loadDiscoveryDocumentAndTryLogin();
  }

  login(){
    // this.oauthService.initCodeFlow();
    this.oauthService.loadDiscoveryDocumentAndLogin();
  }

  a(){
    this.oauthService.loadUserProfile().then(u=>{
      console.log(u);
    })
  }

}
