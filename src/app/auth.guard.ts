import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import jwt_decode from "jwt-decode";


@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {
  constructor(private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree | boolean {
    const token = localStorage.getItem('token');
    
    if (token) {
      const isExpired = this.tokenexpiraton(token)
      if (!isExpired) {
        return true

      } else {
        this.router.navigate(["/login"])
        return false
      }

    } else {
      this.router.navigate(["/login"])
      return false
    }
  }
  tokenexpiraton(token: any): boolean {
    const decoded:any=jwt_decode(token);
    
    return Math.floor(new Date().getTime()/1000)>=decoded
    
  }

}
