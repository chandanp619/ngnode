import { Component, OnInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements OnInit {

  pageData:any;
  constructor(private titleService:Title,private _http:HttpClient) { 
    this.titleService.setTitle(this.title);
    this._http.get("/api/page/slug/pricing").subscribe((response)=>{
      this.pageData = new Page(response);
    });

  }

  ngOnInit() {
  }
title = 'Pricing | My Site';
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
