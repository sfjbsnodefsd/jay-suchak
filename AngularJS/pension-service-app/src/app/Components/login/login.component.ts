import { Component, OnInit } from '@angular/core';
import User from 'src/app/Entity/User';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = new User();
  login() {
    const observables = this.loginService.login(this.user);
    observables.subscribe(
      (response: any) => {
        console.log(response);
        localStorage.setItem('token', response.token)
      },
      (error) => {
        console.log(error);
      }
    );
  }
  constructor(private loginService:LoginService) { }
  ngOnInit(): void {
  }

}
