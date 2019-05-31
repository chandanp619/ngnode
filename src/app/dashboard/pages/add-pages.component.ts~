import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder , FormArray} from '@angular/forms';
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
  meta: FormArray;
  constructor(private router:Router, private fb:FormBuilder,private _http:HttpClient) { 

    this.addPageForm = this.fb.group({
      title:new FormControl(),
      content:new FormControl(),
      slug: new FormControl(),
      meta: this.fb.array([ this.CreateMetaField() ])
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


  CreateMetaField():FormGroup{
    return this.fb.group({
      key: new FormControl(''),
      value: new FormControl('')
    });
  }
  AddMore():void{
    console.log('Creating Field');
    this.meta = this.addPageForm.get('meta') as FormArray;
    this.meta.push(this.CreateMetaField());
  }


  RemoveMeta(index:number):void{
    this.meta = this.addPageForm.get('meta') as FormArray;
    this.meta.removeAt(index);
  }

}
