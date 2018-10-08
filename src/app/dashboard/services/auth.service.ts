import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _http:HttpClient) { }

  login(data:any){
    return  this._http.post('/api/authenticate',data);
  }

  logout():boolean{

    return true;
  }

  checkAuth(){
    return this._http.get('/api/checksession');
  }

}
