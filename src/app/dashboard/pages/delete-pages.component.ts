import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute,Router } from '@angular/router';


@Component({
  selector: 'app-delete-pages',
  templateUrl: './delete-pages.component.html',
  styleUrls: ['./delete-pages.component.css']
})
export class DeletePagesComponent implements OnInit {
  model:any = {};
  AuthStatus:Boolean ;
  AuthStatusMessage:String ='';
  status:any;
  constructor(private _http:HttpClient,private activeRoute:ActivatedRoute, private router:Router) { 

    var pageID = this.activeRoute.snapshot.params.id;
    console.log('Deleting page:'+pageID);
    this._http.get('/api/page/delete/'+pageID).subscribe((response)=>{
      if(Boolean(response) == true){
        //this.status = response;
        this.router.navigateByUrl('/dashboard/pages');
      }
    });
  }

  ngOnInit() {
  }

}
