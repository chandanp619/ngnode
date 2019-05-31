import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BOOL_TYPE } from '@angular/compiler/src/output/output_ast';
import { Router,  ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
Menus:any = [];
AuthStatus:Boolean;
  constructor(private _http:HttpClient, private router:Router) { 
	this._http.get('/api/allmenus').subscribe((response) => {
      this.Menus =  response;
    });  
  }

  ngOnInit() {
  }

}
