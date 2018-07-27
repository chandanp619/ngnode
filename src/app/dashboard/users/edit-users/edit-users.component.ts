import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
declare var $: any;

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
  myForm:FormGroup;
  meta: FormArray;

  constructor(private router:Router, private route:ActivatedRoute, private _http:HttpClient, private fb:FormBuilder){
  
    this._http.get('/api/checksession').subscribe((response) => {
      if(Boolean(response)==false){
        this.AuthStatus  = Boolean(response);
        router.navigateByUrl('/dashboard');
      }else{
      this.AuthStatus  = Boolean(response);
      }
    });
  
    var userID = this.route.snapshot.params.id;
  
    this._http.get('/api/getUser/'+userID).subscribe((response) => {
      this.userData = response;
      this.model = response;

      this.myForm = this.fb.group({
        _id: new FormControl(this.model._id),
        email:new FormControl(this.model.email),
        usertype: new FormControl(this.model.usertype),
        username: new FormControl(this.model.username),
        password: new FormControl(this.model.password),
        meta: this.fb.array([ this.CreateMetaField() ])
    });

    this.model.meta.forEach(element => {
      console.log(element);
      let fg = this.fb.group({
        key: new FormControl(element.key),
        value: new FormControl(element.value)
      });
      (this.myForm.get('meta') as FormArray).push(fg);
      
    });
    

    });



   }

  ngOnInit() {

    var userID = this.route.snapshot.params.id;
  
    this._http.get('/api/getUser/'+userID).subscribe((response) => {
      this.userData = response;
      this.model = response;

      this.myForm = this.fb.group({
        _id: new FormControl(this.model._id),
        email:new FormControl(this.model.email),
        usertype: new FormControl(this.model.usertype),
        username: new FormControl(this.model.username),
        password: new FormControl(this.model.password),
        meta: this.fb.array([])
    });
    console.log(this.model.meta);
    this.model.meta.forEach(element => {
     
      if(element.key!=''){
      let fg = this.fb.group({
        key: new FormControl(element.key),
        value: new FormControl(element.value)
      });
    
      (this.myForm.get('meta') as FormArray).push(fg);
    } 
    });


    });
  }

  submtUpdtUser(){

    console.log(this.model);
    this._http.post('/api/updateUser',this.myForm.value).subscribe( (resp:Response) => {
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
    this.meta = this.myForm.get('meta') as FormArray;
    this.meta.push(this.CreateMetaField());
  }


  RemoveMeta(index:number):void{
    this.meta = this.myForm.get('meta') as FormArray;
    this.meta.removeAt(index);
  }
}
