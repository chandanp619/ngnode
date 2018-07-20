import { Component, OnInit } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { Router,  ActivatedRoute, Params } from '@angular/router';
import {DataTableModule} from "angular-6-datatable";

declare var $: any;

@Component({
   selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  AuthStatus: Boolean;
  Users: any;
  Userpages:number;
  perpage:number = 10;
  limit:number = 10;
  offset:number = 0;
  paginate:Array<number>;
  mfData: any[];
  constructor(private _http:HttpClient, private router:Router,private activeRoute:ActivatedRoute) {





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
      this.Users =  response;
    });
    

   }


  ngOnInit() {
    $(() => {
      console.log('hello there!');
    });
  }

}
