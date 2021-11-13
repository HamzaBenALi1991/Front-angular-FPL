import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-single-survey',
  templateUrl: './single-survey.component.html',
  styleUrls: ['./single-survey.component.css']
})
export class SingleSurveyComponent implements OnInit, OnDestroy {
  subcription!: Subscription
  surveyId: any
  survey: any = false
  userid: any
  vote !: FormGroup
  yes: number = 0
  no: number = 0
  votes: number = 0
  show = true
  user: any
  ban: boolean = false
  date = new Date().getDate()
  dated !: Date | any
  constructor(private router: ActivatedRoute, private http: HttpService, private route: Router) { }

  ngOnInit(): void {
    this.vote = new FormGroup({
      "user": new FormControl(null),
      "survey": new FormControl(null),
      "vote": new FormControl(null)
    })
    this.userid = localStorage.getItem('_Id')
    this.http.getOneUser(this.userid).subscribe(res => {
      this.user = res
    }, err => {
      console.log(err);

    }, () => {
      
      this.dated = this.user.updatedAt
      this.dated = this.dated[8] + this.dated[9] 
                      
      if (this.date == this.dated && this.user.status > 4) {
        console.log('hello');
          this.ban = true
      } 
      if (this.dated !=this.date) {
        let body =  {status : 0 }
        this.http.updateUSer(this.user,body).subscribe(res=>{
          console.log(res);
          
        },err =>{
          console.log(err);
          
        })
      }


    })
    this.subcription = this.router.params.subscribe((params: Params) => {
      this.surveyId = params['id'];
      this.http.getOneSurveys(this.surveyId).subscribe(res => {
        this.yes = 0
        this.no = 0
        this.survey = res
      }, err => {
        console.log(err);

      }, () => {
        this.votes = this.survey.votes.length
        for (let i = 0; i < this.votes; i++) {
          if (this.survey.votes[i].vote == 'yes') {
            this.yes = this.yes + 1
          } else {
            this.no = this.no + 1
          }

        }

      })
    }, err => {
      console.log(err);

    })

  }


  clickyes() {
    this.vote.patchValue({
      "vote": 'yes',
      "user": this.userid,
      "survey": this.surveyId
    })
    this.http.addvote(this.vote.value).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);

    })
    console.log(this.user.status);
    let body = { 'status': this.user.status + 1 }
    this.http.updateUSer(this.userid, body).subscribe(res => {
      console.log(res);
      location.reload()

    }, err => {
      console.log(err);

    })
  }
  clickno() {
    this.vote.patchValue({
      "vote": 'no',
      "user": this.userid,
      "survey": this.surveyId
    })
    this.http.addvote(this.vote.value).subscribe(res => {
    }, err => {
      console.log(err);

    })
    console.log(this.user.status);
    let body = { 'status': this.user.status + 1 }
    this.http.updateUSer(this.userid, body).subscribe(res => {
      console.log(res);
      location.reload()

    }, err => {
      console.log(err);

    })
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe()
  }
}
