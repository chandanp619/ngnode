import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addusers',
  templateUrl: './addusers.component.html',
  styleUrls: ['./addusers.component.css']
})
export class AddusersComponent implements OnInit {
  AuthStatus: Boolean;
  StatusMessage: any;
  model: any = {};
  constructor(private _http: HttpClient, private router:Router) {
    this._http.get('/api/checksession').subscribe((response) => {
      if(Boolean(response)==false){
        this.AuthStatus  = Boolean(response);
        router.navigateByUrl('/dashboard');
      }else{
      this.AuthStatus  = Boolean(response);
      }
    });

   }

   submtAddNewUser(){
     
     this._http.post('/api/addNewUser',this.model).subscribe( (resp:Response) => {
      let output = resp; 
      if(output.hasOwnProperty('status'))
      this.StatusMessage = output.status;
      console.log(JSON.stringify(this.StatusMessage));
     });
    
   }

  ngOnInit() {
  }

}
