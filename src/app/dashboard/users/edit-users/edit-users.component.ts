import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Global } from '../../global';
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
  EditForm:FormGroup;
  MediaForm:FormGroup;
  meta: FormArray;

  constructor(private router:Router, private route:ActivatedRoute, private _http:HttpClient, private fb:FormBuilder, private global:Global){
  
    this._http.get('/api/checksession').subscribe((response) => {
      if(Boolean(response)==false){
        this.AuthStatus  = Boolean(response);
        router.navigateByUrl('/dashboard');
      }else{
      this.AuthStatus  = Boolean(response);
      }
    });
  
    var userID = this.route.snapshot.params.id;
  
    this._http.get('/api/getUser/'+userID).subscribe(
      response =>    {
        this.model = response,
        this.EditForm = this.fb.group({
          _id: new FormControl(this.model._id),
          email:new FormControl(this.model.email),
          usertype: new FormControl(this.model.usertype),
          username: new FormControl(this.model.username),
          password: new FormControl(this.model.password),
          image: new FormControl(this.model.image),
          meta: this.fb.array([ this.CreateMetaField() ])
      });
  
  
      this.MediaForm = this.fb.group({
        mediaUpload: new FormControl()
      });
  
      this.model.meta.forEach(element => {
        console.log(element);
        let fg = this.fb.group({
          key: new FormControl(element.key),
          value: new FormControl(element.value)
        });
        (this.EditForm.get('meta') as FormArray).push(fg);
        
      });
      
    },
      error => console.log("Error: ", error)
     );




 



   }
   ngOnInit() {}

/*
  ngOnInit() {

    var userID = this.route.snapshot.params.id;
  
    this._http.get('/api/getUser/'+userID).subscribe(
      response => this.userData = response,
      error=> console.log(error),
      ()=>{
      this.EditForm = new FormGroup({   //this.fb.group
        _id: new FormControl(this.model._id),
        email:new FormControl(this.model.email),
        usertype: new FormControl(this.model.usertype),
        username: new FormControl(this.model.username),
        password: new FormControl(this.model.password),
        meta: this.fb.array([])
    });

    this.MediaForm = new FormGroup({  //this.fb.group
      mediaUpload: new FormControl()
    });

    

    console.log(this.model.meta);
    this.model.meta.forEach(element => {
     
      if(element.key!=''){
      let fg = this.fb.group({
        key: new FormControl(element.key),
        value: new FormControl(element.value)
      });
    
      (this.EditForm.get('meta') as FormArray).push(fg);
    } 
    });


    });
  }
*/
  submtUpdtUser(){

    console.log(this.model);
    this._http.post('/api/updateUser',this.EditForm.value).subscribe( (resp:Response) => {
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
    this.meta = this.EditForm.get('meta') as FormArray;
    this.meta.push(this.CreateMetaField());
  }


  RemoveMeta(index:number):void{
    this.meta = this.EditForm.get('meta') as FormArray;
    this.meta.removeAt(index);
  }


  UploadImage(){
    
    var mediaDATA = this.MediaForm.value;
    
    this._http.post('/api/addNewMedia',mediaDATA).subscribe( (resp:Response) => {
      // let output = resp; 
      // if(output.hasOwnProperty('path'))
      // this.StatusMessage = output;
      // console.log(JSON.stringify(this.StatusMessage));
      console.log(resp);
      var mi = new MediaImage(resp);
      this.global.ImageID = mi._id;
      this.EditForm.get('image').setValue(this.global.ImageID);
     });
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.MediaForm.get('mediaUpload').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        });

        console.log(file);
      };
    }
  }
}

class MediaImage{
  _id:Object;
  filename:String;
  filetype:String;
  value:Blob;
  constructor(obj){
    this._id = obj._id;
    this.filename = obj.filename;
    this.filetype = obj.filetype;
    this.value = obj.value;
  }
}