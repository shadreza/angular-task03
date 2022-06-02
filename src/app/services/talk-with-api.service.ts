import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER } from '../USER';

@Injectable({
  providedIn: 'root'
})
export class TalkWithApiService {
  url: string = "https://jsonplaceholder.typicode.com/posts"
  constructor( private http:HttpClient ) { }

  // apiCall() {
  //   return this.http.get(this.url)
  // }

  registerUser(data: USER) {
    return this.http.post(this.url, data)
  }
}