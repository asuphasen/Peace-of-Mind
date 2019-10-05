import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(
    private router: Router,
    private auth: AngularFireAuth
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    return new Promise((resolve, reject) => {
      try {
        this.auth.authState.subscribe(user => {
          if (!user) {
            console.log("I'm login guard")
            resolve(true);
          }
          else {
            this.router.navigate(['login']);
            resolve(false);
          }
        })
      } catch (error) {
        resolve(true);
      }
    })
  }

}
