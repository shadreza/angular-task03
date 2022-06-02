import { USER } from './../../USER';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.css']
})
export class AllUsersComponent implements OnInit {
  users: USER[] = [
    {
      userName: "A",
      email: "a@a.com",
      dateOfBirth: "03/02/1999",
      password: "123456a123121123bcdeef"
    },
    {
      userName: "B",
      email: "b@a.com",
      dateOfBirth: "04/02/1999",
      password: "123456abasdASDcdeef"
    },
    {
      userName: "C",
      email: "c@a.com",
      dateOfBirth: "03/01/1999",
      password: "123456abc@@##$deef"
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
