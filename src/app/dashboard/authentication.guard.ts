import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
status:any;
  constructor(private auth:AuthService, private route:Router){

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if(this.getValueFromServ() == true){
        return true;
      }else{
        this.route.navigateByUrl('/dashboard');
        return false;
      }
   

  }

  getValueFromServ():boolean{
    this.auth.checkAuth().subscribe((response)=> {this.status = Boolean(response)});
    return this.status;
  }
}
