import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  login(username:String,password:String):boolean{

    return true;
  }

  logout():boolean{

    return true;
  }

  checkAuth(){
    return this._http.get('/api/checksession');
  }

}
