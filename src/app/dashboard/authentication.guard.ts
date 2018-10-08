import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
status:any;
  constructor(private auth:AuthService){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(this.getValueFromServ() == true){
        return true;
      }else{
        return false;
      }
   

  }

  getValueFromServ():boolean{
    this.auth.checkAuth().subscribe((response)=> {this.status = Boolean(response)});
    return this.status;
  }
}
