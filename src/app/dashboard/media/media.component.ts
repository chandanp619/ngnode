import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,  ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { Global } from '../global';
import * as jQuery from 'jquery';

//declare var jQuery:any;

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.css']
})
export class MediaComponent implements OnInit {
  
  Medias:any = [];
  XMedias:any = [];
  AuthStatus:Boolean;
  MediaForm:FormGroup;
  activeImage:String;
  constructor( private _http:HttpClient, private router:Router,private activatedRoute:ActivatedRoute, private fb:FormBuilder, private global:Global) {

    
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
      console.log(response);
        this.Medias = response;
    });

    this.MediaForm = this.fb.group({
      mediaUpload: new FormControl()
    });
 
  }

  showControl(index){
    
    // var pelm = document.getElementById('media-container');
    // Array.from(document.querySelectorAll('.controls')).forEach(function(item){
    //     (<HTMLElement>item).style.display='none';
    // });
    
       
     

    //  var elm = document.getElementById('controls-'+index);
    //  var style = window.getComputedStyle(elm);
    //  if(style.display=='block'){
    //    elm.style.display='none';
    //    this.global.ImageID = '';
    //  }else{
    //   elm.style.display='block';
    //   this.global.ImageID = elm.querySelector('input').value;



      
    //  }
   }

   ngOnInit() {
    jQuery(document).ready(function(){
      jQuery('#media-container img').click(function(){
        alert('hello!!!!');
        jQuery('#media-container .controls').css({'display':'none'});
        jQuery(this).siblings('.controls').css({'display':'block'});
      });
      
    });
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
      this._http.get('/api/allmedia').subscribe((response) => {
        this.Medias =  response;
      });
      var elm_inp = document.getElementById('mediaUpload');
      elm_inp.setAttribute("value","");
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
  removeMedia(mediaID){
    this._http.get('/api/media/delete/'+mediaID).subscribe((response) => {
      this.global.ImageID = '';
      this._http.get('/api/allmedia').subscribe((response) => {
        this.Medias =  response;
      });
    });
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