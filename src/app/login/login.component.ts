import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  status = false
  data : any
  loginForm: FormGroup|any 
  constructor( private http :HttpService ,private auth : AuthService ,
    private element: ElementRef,
    private path: Renderer2,
    private router: Router) { }
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      "email": new FormControl(null,  Validators.required),
      "password": new FormControl(null, Validators.required)

    });
    this.loginForm.valueChanges.subscribe( // this is for updating form in real time  via subscription 
      (value: any) => {
        this.status = this.loginForm.status === 'VALID' ? true : false // this is for updating disablied button 
      }
    );
  }
  onSubmit(){
    this.http.login(this.loginForm.value).subscribe(res=>{
      this.data = res ;
      this.auth.logIn(this.data.token , this.data._Id);
      this.router.navigate(['HomePage']);
    },err=>{
      
      if (err.error.message === 'Please make sure the email and password are correct .') {
        let part = this.element.nativeElement.querySelector('.thisiswrong')
        this.path.addClass(part, 'show');

      } else {
        alert(err.message)

      }
      
    })
  }
}
