import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { Router } from '@angular/router';
import { PlatformLocation } from '@angular/common'
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  model:any = {};
  AuthStatus:Boolean ;
  AuthStatusMessage:String ='';
  constructor(private auth:AuthService,private _http:HttpClient, private router:Router, private location:PlatformLocation) {
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

    this.auth.login(this.model).subscribe(
      (res)=>{ 
                  if(res ==true){
                    this.AuthStatus=true;
                    this.AuthStatusMessage = 'User Authenticated Successfully';
                  }else{
                    this.AuthStatus=false;
                    this.AuthStatusMessage = 'User Authenticated Failed';
                  }
            },
      (error)=>{
        this.AuthStatus=false;
        console.log(error);
      }
    );

    

    
  }


  logout(){
    
  }
  ngOnInit() {
  }

}
