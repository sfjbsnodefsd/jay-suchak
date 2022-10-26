import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-forms',
  templateUrl: './user-forms.component.html',
  styleUrls: ['./user-forms.component.css']
})
export class UserFormsComponent implements OnInit {
  title = "Form";
  name="";
  age=null;
  gender="";

  save() {
    console.log(`${this.name} ${this.age} ${this.gender}`);
  }
  constructor() { }

  ngOnInit(): void {
  }

}
