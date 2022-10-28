import { Component, OnInit } from '@angular/core';
import User from 'src/app/Entity/User';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-registered-users',
  templateUrl: './registered-users.component.html',
  styleUrls: ['./registered-users.component.css']
})
export class RegisteredUsersComponent implements OnInit {

  constructor(public userService:UserService) { }
  users : User[] = [];
  deleteRow(user: any, index:number) {
    const obs = this.userService.deleteUser(user);
    obs.subscribe((res:any)=> {
      this.users.slice(index, 1);
    })
  }
  ngOnInit(): void {
    const promise = this.userService.getUsers();
    promise.subscribe((users)=> {
      console.log(users);
      this.users = users as User[];
    })
  }

}
