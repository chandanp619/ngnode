import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common'



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  model:any = {};
  AuthStatus:Boolean ;
  AuthStatusMessage:String ='';
  constructor(private _http:HttpClient, private router:Router, private location:PlatformLocation) {
    location.onPopState(() => {
      console.log('back pressed');
  });
    this._http.get('/api/checksession').subscribe((response) => {
      console.log('I am Constructor...');
      if(Boolean(response)==false)
        this.AuthStatus  = Boolean(response);
      else
      this.AuthStatus  = Boolean(response);
      console.log('checksession Response:'+response.toString());
    });

  }

  submitLogin(){
    console.log('Form Submission Working...'+JSON.stringify(this.model));
    this._http.post('/api/authenticate',this.model).subscribe((response) => {
      console.log(response);
      this.AuthStatus  = Boolean(response);
    });

    if(this.AuthStatus==true){
      this.AuthStatusMessage = 'User Authenticated Successfully';
    }else{
      this.AuthStatusMessage = 'User Authenticated Failed';
    }
  }


  logout(){
    
  }
  ngOnInit() {
  }

}
