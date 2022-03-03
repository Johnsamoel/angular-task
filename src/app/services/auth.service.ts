import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient:HttpClient , private route:Router) { }
  login(userLogin : {email:string , password : string})
  {
    return this.httpClient.post('http://localhost:4200/login',userLogin);
  }
  logout(){
    localStorage.clear();
    this.route.navigate(['auth/login']);
  }
  isLoggedIn(){
    return !!localStorage.getItem('token');
  }
  getLoggedInUser(){
    const userData = localStorage.getItem('user');
    return userData ? JSON.parse(userData) : null;
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
