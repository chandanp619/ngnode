import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,  ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  Medias:any = [];
  AuthStatus:Boolean;
  constructor( private _http:HttpClient, private router:Router) {

    
    this._http.get('/api/checksession').subscribe((response) => {
      //console.log('I am Constructor...');
      if(Boolean(response)==false){
        this.AuthStatus  = Boolean(response);
        router.navigateByUrl('/dashboard');
      }else{
      this.AuthStatus  = Boolean(response);
      //console.log('checksession Response:'+response.toString());
      }
    });

    this._http.get('/api/allmedia').subscribe((response) => {
      this.Medias =  response;
    });

   }


  showControl(index){
     var elm = document.getElementById('controls-'+index);
     var style = window.getComputedStyle(elm);
     if(style.display=='block'){
       elm.style.display='none';
     }else{
      elm.style.display='block';
     }
   }
  ngOnInit() {
  }



}
