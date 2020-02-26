import { Injectable } from '@angular/core';
import { PlatformLocation } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn :number = 0; 
  user: string = '-1';
  constructor(private route: ActivatedRoute,){
  }

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  setUser(id: string):void{
    this.user = id
  }

  logout(): void {
    this.isLoggedIn = 0;
  }

  testLogin(): boolean{
    return true;
  }
}
