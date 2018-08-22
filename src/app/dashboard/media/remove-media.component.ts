import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { Global } from '../global';

@Component({
  selector: 'app-remove-media',
  templateUrl: './remove-media.component.html',
  styleUrls: ['./remove-media.component.css']
})
export class RemoveMediaComponent implements OnInit {
  AuthStatus:any;
  constructor(private _http:HttpClient, private router:Router,private route:ActivatedRoute, private global:Global) { 
    var mediaID = this.route.snapshot.params.id;
    this._http.get('/api/checksession').subscribe((response) => {
      //console.log('I am Constructor...');
      if(Boolean(response)==false){
        this.AuthStatus  = Boolean(response);
        this.router.navigateByUrl('/dashboard');
      }else{
      this.AuthStatus  = Boolean(response);
      //console.log('checksession Response:'+response.toString());
      }
    });
    this._http.get('/api/media/delete/'+mediaID).subscribe((response) => {
      this.global.ImageID = '';
      this.router.navigateByUrl('/dashboard/media');
    });

  }

  ngOnInit() {
  }

}
