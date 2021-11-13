import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AddsurveyComponent } from './surveys/home-page/addsurvey/addsurvey.component';
import { HomePageComponent } from './surveys/home-page/home-page.component';
import { InitalComponent } from './surveys/home-page/inital/inital.component';
import { SingleSurveyComponent } from './surveys/home-page/single-survey/single-survey.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'registration', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'HomePage', component: HomePageComponent, children: [
      { path: '', component: InitalComponent },
      { path: 'newSurvey', component: AddsurveyComponent },
      { path: 'survey/:id', component: SingleSurveyComponent },

    ]
  },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
