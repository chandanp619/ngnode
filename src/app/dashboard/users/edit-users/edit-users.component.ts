import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css']
})
export class EditUsersComponent implements OnInit {
  userData:any;
  model:any;
  AuthStatus:any;
  StatusMessage:any;
  constructor(private router:Router, private route:ActivatedRoute, private _http:HttpClient){

    this._http.get('/api/checksession').subscribe((response) => {
      if(Boolean(response)==false){
        this.AuthStatus  = Boolean(response);
        router.navigateByUrl('/dashboard');
      }else{
      this.AuthStatus  = Boolean(response);
      }
    });

    


   }

  ngOnInit() {
    
    var userID = this.route.snapshot.params.id;
  
    this._http.get('/api/getUser/'+userID).subscribe((response) => {
      this.userData = response;
      this.model = response;
      console.log('UserID:'+userID);
      console.log('Angular Userdata:'+response);
    });


  }

  submtUpdtUser(){
    this._http.post('/api/updateUser',this.model).subscribe( (resp:Response) => {
      let output = resp; 
      if(output.hasOwnProperty('status'))
      this.StatusMessage = output.status;
      console.log(JSON.stringify(this.StatusMessage));
     });
  }

}
