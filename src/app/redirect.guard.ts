import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RedirectAuthenticatedGuard implements CanActivate {
  constructor(private router : Router){}
  canActivate( 
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree |any{
      const user =localStorage.getItem('user')
      if (user) {
        this.router.navigate(['HomePage'])
      } else {
        return true 
      }
    }
  
}
