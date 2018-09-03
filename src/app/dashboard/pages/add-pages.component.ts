import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

declare var $:any;

@Component({
  selector: 'app-add-pages',
  templateUrl: './add-pages.component.html',
  styleUrls: ['./add-pages.component.css']
})
export class AddPagesComponent implements OnInit {
  AuthStatus:any;
  addPageForm:FormGroup;
  StatusMessage:any;
  constructor(private router:Router, private fb:FormBuilder,private _http:HttpClient) { 

    this._http.get('/api/checksession').subscribe((response) => {
      if(Boolean(response)==false){
        this.AuthStatus  = Boolean(response);
        router.navigateByUrl('/dashboard');
      }else{
      this.AuthStatus  = Boolean(response);
      }
    });


    this.addPageForm = this.fb.group({
      title:new FormControl(),
      content:new FormControl(),
      slug: new FormControl()
    });

  
  }

  ngOnInit() {
    $(document).ready(function(){
      
    })
   
  }

  SubmitAddPage(){
    this._http.post('/api/page/add',this.addPageForm.value).subscribe( (resp:Response) => {
      let output = resp; 
      if(output.hasOwnProperty('status'))
      this.StatusMessage = output.status;
      console.log(JSON.stringify(this.StatusMessage));
     });
  }

}
