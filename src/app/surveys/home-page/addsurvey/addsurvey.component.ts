import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-addsurvey',
  templateUrl: './addsurvey.component.html',
  styleUrls: ['./addsurvey.component.css']
})
export class AddsurveyComponent implements OnInit {
  id: any
  user: any =false 
  SurveyForm: FormGroup | any
  status = false
  constructor(private http: HttpService , private router :Router) { }

  ngOnInit(): void {
    this.id = localStorage.getItem('_Id')
    this.http.getOneUser(this.id).subscribe(res => {
      this.user = res
    }, err => {
      console.log(err);

    })
    this.SurveyForm = new FormGroup({
      'titre': new FormControl(null, Validators.required),
      "description": new FormControl(null, Validators.required),
      "user": new FormControl(null)
    })
    this.SurveyForm.valueChanges.subscribe( // this is for updating form in real time  via subscription 
      (value: any) => {
        this.status = this.SurveyForm.status === 'VALID' ? true : false // this is for updating disablied button 
      }
    );

  }

  onSubmit() {
    this.SurveyForm.patchValue({ user: this.user._id });
    this.http.addSurvey(this.SurveyForm.value).subscribe(res=>{
      this.router.navigate(['/HomePage'])
      location.reload()
      this.SurveyForm.reset()
      console.log(res);
      
    },err =>{
      console.log(err);
      
    })

  }

}
