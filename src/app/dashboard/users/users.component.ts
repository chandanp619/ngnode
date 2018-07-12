import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';

@Component({
   selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  AuthStatus: Boolean;
  Users: any;
  constructor(private _http:HttpClient, private router:Router) {
    this._http.get('/api/checksession').subscribe((response) => {
      console.log('I am Constructor...');
      if(Boolean(response)==false){
        this.AuthStatus  = Boolean(response);
        router.navigateByUrl('/dashboard');
      }else{
      this.AuthStatus  = Boolean(response);
      console.log('checksession Response:'+response.toString());
      }
    });

    this._http.get('/api/allusers').subscribe((response) => {
      this.Users = response;
    });


   }

  ngOnInit() {
    
  }

}
