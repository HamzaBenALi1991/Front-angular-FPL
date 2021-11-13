import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  id: any
  user: any
  constructor(private http: HttpService ,private route :Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('_Id')
    this.http.getOneUser(this.id).subscribe(res => {
      this.user = res
    }, err => {
      console.log(err);
      
    })

  }
logout(){
localStorage.clear()
this.route.navigate(["/login"])
}
}
