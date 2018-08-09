import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { Router,  ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css']
})
export class PagesComponent implements OnInit {
Pages:any = [];
AuthStatus:Boolean;
  constructor( private _http:HttpClient, private router:Router) {

    
    this._http.get('/api/checksession').subscribe((response) => {
      //console.log('I am Constructor...');
      if(Boolean(response)==false){
        this.AuthStatus  = Boolean(response);
        router.navigateByUrl('/dashboard');
      }else{
      this.AuthStatus  = Boolean(response);
      //console.log('checksession Response:'+response.toString());
      }
    });

    this._http.get('/api/allusers').subscribe((response) => {
      this.Pages =  response;
    });
    
    this._http.get('/api/pages').subscribe((response) => {
      this.Pages =  response;
    });
   }

  ngOnInit() {
  }

}
