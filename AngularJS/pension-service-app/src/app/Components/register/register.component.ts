import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private loginService:LoginService) { }
  user: any = {
    name:null,
    email:null,
    password:null
  };


  register()  {
    const observables = this.loginService.register(this.user);
    observables.subscribe({
      next: data => {
        console.log(data);
      },
      error: err => {
        console.error(err);
      }
    });
  }
  ngOnInit(): void {
  }

}
