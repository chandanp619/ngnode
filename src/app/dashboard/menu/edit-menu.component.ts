import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder , FormArray} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import * as jQuery from 'jquery';
import { AppServiceService } from '../../services/app-service.service';

@Component({
  selector: 'app-edit-menu',
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.css']
})
export class EditMenuComponent implements OnInit {
  menuID:any;
  EditMenuForm:FormGroup;
  StatusMessage:any;
  items: any;
  model:any;
  constructor(private router:Router,private route:ActivatedRoute, private fb:FormBuilder,private _http:HttpClient,private AppService:AppServiceService) { 

    this.menuID = this.route.snapshot.params.id;
		this.items = Array();
		this.AppService.getMenu(this.menuID).then(()=>{
			//console.log("Results::::::::::::");
			//console.log(this.AppService.results);

	this.EditMenuForm = this.fb.group({
      title:new FormControl(this.AppService.results.title)
    });
    
    
    	this.AppService.results.items.forEach(element => {
    
		          var itm = new Array();
		          	itm['parent'] = element.parent,
      				itm['title'] =  element.title;
      				itm['slug'] = element.slug,
      				itm['target']  = element.target,
      				itm['component'] = element.component
      			this.items.push(itm);
      		
      });	
      	
		console.log(this.items);	
			
			
			
		});
		

  	
      
  }

  ngOnInit() {
	
  }
  SubmitEditMenu(){
    this._http.post('/api/menu/update',this.EditMenuForm.value).subscribe( (resp:Response) => {
      let output = resp; 
      if(output.hasOwnProperty('status'))
      this.StatusMessage = output.status;
      console.log(JSON.stringify(this.StatusMessage));
     });
  }
  
  CreateItemsField():FormGroup{
    return this.fb.group({
      parent: new FormControl(''),
      title: new FormControl(''),
      slug: new FormControl(''),
      target: new FormControl(''),
      component:new FormControl('')
    });
  }
  


  RemoveItem(index):void{
   var removeItem = this.items[index];
   
    this.items.splice(index, 1);
  }


}
