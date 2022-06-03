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
      dateOfBirth: "28/02/1999",
      password: "123456abasdASDcdeef"
    },
    {
      userName: "C",
      email: "c@a.com",
      dateOfBirth: "03/01/1999",
      password: "123456abc@@##$deef"
    }
  ]

  convertToDateFormat(date: string) {
    return date[6] + date[7] + date[8] + date[9] + '-' + date[3] + date[4] + '-' + date[0] + date[1]
  }

  constructor() { }

  ngOnInit(): void {
    this.users.forEach(user => {
      user.dateOfBirth = this.convertToDateFormat(user.dateOfBirth)
    })
  }

}
