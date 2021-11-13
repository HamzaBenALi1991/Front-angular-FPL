import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http :HttpClient) { }
  // user http requests
  addProfile(body:any)  {
   return this.http.post("http://localhost:3000/newuser", body)    
  }
   // login 
   login(body: any) {
    return this.http.post(`http://localhost:3000/login`, body)
  }
  // get one user 
  getOneUser(id: any) {
    return this.http.get(`http://localhost:3000/user/${id}`)
  }
  getAllUsers() {
    return this.http.get('http://localhost:3000/users')
  }
  updateUSer(id:any , body :any ) {
    return this.http.put(`http://localhost:3000/user/${id}`,body)
  }



  //////////////////////////////////////////////////surveys http R ..../////////////::::

  addSurvey(body:any){
    return this.http.post("http://localhost:3000/newSurvey", body)    

  }
  getAllSurveys() {
    return this.http.get('http://localhost:3000/Surveys')
  }
  getOneSurveys(id:any) {
    return this.http.get(`http://localhost:3000/Survey/${id}`)
  }
  




  ///// votes 
  addvote(body:any)  {
    return this.http.post("http://localhost:3000/vote", body)    
   }
}
