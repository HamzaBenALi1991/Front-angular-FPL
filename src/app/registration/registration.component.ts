import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private http: HttpService,
    private element: ElementRef,
    private path: Renderer2,
    private router: Router) { }
  status = false;
  pass = "";
  SignUpForm: FormGroup | any;
  regexPseudo = /^(?!\s)[a-zA-Z0-9_\s-]{2,20}$/
  regexEmail = /([-!#-'*+/-9=?A-Z^-~]+(\.[-!#-'*+/-9=?A-Z^-~]+)*|"([]!#-[^-~ \t]|(\\[\t -~]))+")@[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?(\.[0-9A-Za-z]([0-9A-Za-z-]{0,61}[0-9A-Za-z])?)+/
  ngOnInit(): void {
    this.SignUpForm = new FormGroup({
      "username": new FormControl(null, [Validators.required, Validators.pattern(this.regexPseudo)]),
      "email": new FormControl(null, [Validators.required, Validators.pattern(this.regexEmail)]),
      "password": new FormControl(null, [Validators.required, Validators.minLength(6)]),
      "password2": new FormControl(null, [Validators.required, this.confirmPassword.bind(this)]),

    });
    // for ASYNCvalidation password 
    this.SignUpForm.valueChanges.subscribe( // this is for updating password input to compare it to password 2 on the confirmpassword validator 
      (value: any) => {
        this.pass = value.password;
        this.status = this.SignUpForm.status === 'VALID' ? true : false // this is for updating disablied button 
      }
    );
  }




  // this is a personalised validators for checking the confirmation password 
  confirmPassword(control: FormControl | any): { [s: string]: Boolean } | null {
    if (this.pass !== control.value) {
      return { 'NoMatch': true };
    } return null
  }
  onsubmit() {
    this.http.addProfile(this.SignUpForm.value).subscribe(res => {
      console.log(res);
      this.router.navigate(['/login'])
    }, err => {
      if (err.message == "Http failure response for http://localhost:3000/newuser: 403 Forbidden") {
        let part = this.element.nativeElement.querySelector('.thisiswrong')
        this.path.addClass(part, 'show');

      } else {
        console.log(err);
      }
    })
  }

}
