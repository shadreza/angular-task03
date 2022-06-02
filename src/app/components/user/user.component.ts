import { USER } from './../../USER';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() user: USER = {
    userName: "",
    email: "",
    dateOfBirth: "",
    password: ""
  };
  showEdit: boolean = false;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.user.userName)
  }

  openModal() {
    this.showEdit = ! this.showEdit
  }

}
