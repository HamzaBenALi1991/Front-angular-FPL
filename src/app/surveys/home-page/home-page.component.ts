import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  surveys :any 
  userid:any
  user:any
  constructor(private http :HttpService) { }

  ngOnInit(): void {
    this.userid = localStorage.getItem('_Id')
    this.http.getOneUser(this.userid).subscribe(res=>{
      this.user=res 
      localStorage.setItem('user', JSON.stringify(this.user))
    },err=>{
      console.log(err);
      
    })
    this.http.getAllSurveys().subscribe(res=>{
      this.surveys = res
      
    },err=>{
      console.log(err);
      
    })
  }

}
