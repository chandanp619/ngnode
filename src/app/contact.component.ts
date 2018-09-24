import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  pageData:any;
  constructor(private titleService:Title,private _http:HttpClient) { 
    this.titleService.setTitle(this.title);
    this._http.get("/api/page/slug/contact-us").subscribe((response)=>{
      this.pageData = new Page(response);
    });

  }

  ngOnInit() {
  }
title = 'Contact Us | My Site';
}

class Page{
    title: String;
    slug: String;
    content: String;
    date: Date;
    meta:Array<Object>;
    user:String
  constructor(obj){
    this.title= obj.title;
    this.content = obj.content;
    this.date = new Date(obj.date);
    this.slug = obj.slug;
    this.user = obj.user;
    this.meta = obj.meta;
  }
}
