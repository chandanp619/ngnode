import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
results:any;
  constructor(private http:HttpClient) { 
	this.results = "";  
  }
  
  getMenu(id){
		  let promise =  new Promise((resolve,reject)=>{
this.http.get('/api/menu/'+id).toPromise().then(
					res=>{
					this.results = res;
					resolve();
					},
					msg=>{
					reject(msg);
					});		  
		  });
		  return promise;
  }
}
