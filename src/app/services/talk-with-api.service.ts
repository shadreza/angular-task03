import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER } from '../USER';

@Injectable({
  providedIn: 'root'
})
  
export class TalkWithApiService {
  url: string = "http://three60.learnathon.net/api1/api/register"
  constructor( private http:HttpClient ) { }

  // apiCall() {
  //   return this.http.get(this.url)
  // }

  registerUser(data: USER) {
    return this.http.post(this.url, data)
  }
}
