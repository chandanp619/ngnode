import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
  AuthStatus:Boolean = false;
  AuthStatusMessage:String = '';
  constructor(private _http : HttpClient, private router:Router) { 
    this._http.get('/api/logout').subscribe((response) => {
      if(Boolean(response) == true){
        this.AuthStatus = false;
        this.AuthStatusMessage = '';
        localStorage.setItem('AuthToken','false');
        this.router.navigate(['/dashboard']);
      }
    });
  }

  ngOnInit() {
  }

}
