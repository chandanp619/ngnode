import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder , FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-pages',
  templateUrl: './edit-pages.component.html',
  styleUrls: ['./edit-pages.component.css']
})
export class EditPagesComponent implements OnInit {
  AuthStatus:any;
  editPageForm:FormGroup;
  StatusMessage:any;
  meta: FormArray;
  model:any;
  pageID:any;
  constructor(private router:Router,private route:ActivatedRoute, private fb:FormBuilder,private _http:HttpClient) { 
 

    this.pageID = this.route.snapshot.params.id;

    this._http.get('/api/page/'+this.pageID).subscribe(
      response =>    {
        this.model = response,
        this.editPageForm = this.fb.group({
          title:new FormControl(this.model.title),
          content:new FormControl(this.model.content),
          slug: new FormControl(this.model.slug),
          meta: this.fb.array([ this.CreateMetaField() ])
        });

        this.model.meta.forEach(element => {
          console.log(element);
          let fg = this.fb.group({
            key: new FormControl(element.key),
            value: new FormControl(element.value)
          });
          (this.editPageForm.get('meta') as FormArray).push(fg);
          
        });
      });
    
  }

  SubmitEditPage(){

    
    console.log(this.pageID);
    this._http.post('/api/page/edit/'+this.pageID,this.editPageForm.value).subscribe( (resp:Response) => {
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
    this.meta = this.editPageForm.get('meta') as FormArray;
    this.meta.push(this.CreateMetaField());
  }


  RemoveMeta(index:number):void{
    this.meta = this.editPageForm.get('meta') as FormArray;
    this.meta.removeAt(index);
  }

  ngOnInit() {
  }

}
