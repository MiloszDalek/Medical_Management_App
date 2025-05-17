import { ActivatedRouteSnapshot, CanActivateChild, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {StorageService} from "../auth/services/storage/storage.service";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivateChild {

  constructor(private router: Router) {}

  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const expectedRoles = childRoute.data['roles'] as string[];
    const userRole = StorageService.getUserRole();

    if (expectedRoles.includes(userRole)) {
      return true;
    } else {
      if (userRole === 'PATIENT') {
        return this.router.parseUrl('/patient/dashboard');
      } else if (userRole === 'DOCTOR') {
          return this.router.parseUrl('/doctor/dashboard');
      } else {
        return this.router.parseUrl('/home');
      }
    }
  }
}
