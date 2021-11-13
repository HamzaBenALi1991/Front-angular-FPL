import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { YourInterceptor } from './services/your-interceptor.service';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HomePageComponent } from './surveys/home-page/home-page.component';
import { AddsurveyComponent } from './surveys/home-page/addsurvey/addsurvey.component';
import { InitalComponent } from './surveys/home-page/inital/inital.component';
import { HttpService } from './services/http.service';
import { AuthService } from './services/auth.service';
import { SingleSurveyComponent } from './surveys/home-page/single-survey/single-survey.component';
import { AuthGuardGuard } from './auth.guard';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegistrationComponent,
    LoginComponent,
    HomePageComponent,
    AddsurveyComponent,
    InitalComponent,
    SingleSurveyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  
    
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: YourInterceptor,
    multi: true
  }, {
    provide: LocationStrategy,
    useClass: HashLocationStrategy,

  }, HttpService,AuthService, AuthGuardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
