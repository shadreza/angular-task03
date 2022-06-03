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

  modifiedUser: USER = this.user;
  visibleDOB: string = "";
  showEdit: boolean = true;
  passwordValidityCheck: string = "";

  updateVisibleDOB() {
    this.visibleDOB = new Date(this.modifiedUser.dateOfBirth).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})
  }

  constructor() { }

  ngOnInit(): void {
    this.modifiedUser = this.user
    this.updateVisibleDOB()
  }

  openModal() {
    this.showEdit = ! this.showEdit
  }

}
