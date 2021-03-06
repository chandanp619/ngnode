import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder , FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
addMenuForm:FormGroup;
  StatusMessage:any;
  items: FormArray;
  constructor(private router:Router, private fb:FormBuilder,private _http:HttpClient) { 
  	this.addMenuForm = this.fb.group({
      title:new FormControl(),
      items: this.fb.array([ this.CreateItemsField()])
    });
  }

  ngOnInit() {

  }
  SubmitAddMenu(){
    this._http.post('/api/menu/add',this.addMenuForm.value).subscribe( (resp:Response) => {
      let output = resp; 
      if(output.hasOwnProperty('status'))
      this.StatusMessage = output.status;
      console.log(JSON.stringify(this.StatusMessage));
     });
  }
  
  CreateItemsField():FormGroup{
    return this.fb.group({
      item_parent: new FormControl(''),
      item_title: new FormControl(''),
      slug: new FormControl(''),
       target: new FormControl(''),
      custom_class:new FormControl('')
    });
  }
  AddMore():void{
    console.log('Creating Field');
    this.items = this.addMenuForm.get('items') as FormArray;
    this.items.push(this.CreateItemsField());
  }


  RemoveItem(index:number):void{
    this.items = this.addMenuForm.get('items') as FormArray;
    this.items.removeAt(index);
  }


}
