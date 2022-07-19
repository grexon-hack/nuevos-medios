import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutenticateGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private rout: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.afAuth.currentUser.then((user) => {
        if(user && user.emailVerified) {
          return true;
        }else {
          this.rout.navigate(['/']);
          return false;
        }
      })
  }
}
