import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { BackendUserService } from '../shared/backend-user.service';

@Injectable({
  providedIn: 'root',
})
export class BoardMainGuard implements CanActivate {
  constructor(private authService: BackendUserService, private userAuth:BackendUserService, private router:Router,  ) {

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
      const token = localStorage.getItem("token")
      
      if (token) {

        const decoded = this.userAuth.checkTokenExpiration(token)
        const currentUnixTime = Math.floor(Date.now() / 1000);
        
          if (decoded.exp < currentUnixTime) {
            localStorage.removeItem("token");
            this.userAuth.userLoggedIn();
            this.router.navigate(['Home']);
          }

      }
    return this.authService.isLoggedIn();
  }
}
