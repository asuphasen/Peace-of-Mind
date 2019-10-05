import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardGuard implements CanActivate {

  constructor(
    private auth: AngularFireAuth,
    private router: Router
  ) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.auth.authState.subscribe(user => {
          if (user) {
            console.log("user------>",user)
            resolve(true);
          }
          else {
            this.router.navigate(['login']);
            resolve(false);
          }
        })
      } catch (error) {
        this.router.navigate(['login']);
        resolve(false);
      }
    })
  }


}
