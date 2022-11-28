import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { HomepageComponent } from '../homepage/homepage.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email = '';
  Password = 'admin';
  inputpass!: string;
  name = ''
  @Input() nameOfUser = this.name

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  login(){
    if(this.inputpass !== this.Password){
      alert("password is wrong")
    }
    if(this.inputpass === this.Password){
      this.router.navigateByUrl('/homePage')
    }

    for(let i=0; i<this.email.length; i++){
      if(this.email[i] == '@'){
          this.name = this.email.slice(0,i);
      }
    }
  }
}
