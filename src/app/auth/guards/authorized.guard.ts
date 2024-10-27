import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  CanMatch,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthenticationFacade } from "@app/store/authentication/authentication.facade";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard implements CanLoad, CanActivate, CanMatch {
  private uuidPattern =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  constructor(
    private router: Router,
    private authenticationFacade: AuthenticationFacade
  ) {}

  canLoad(
    route: Route,
    segment: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authenticationFacade.isAuthorized$.pipe(
      take(1),
      map((isAuthorized) => {
        if (isAuthorized) {
          return true;
        } else {
          return this.router.createUrlTree(["/login"]);
        }
      })
    );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authenticationFacade.isAuthorized$.pipe(
      take(1),
      map((isAuthorized) => {
        if (isAuthorized) {
          return true;
        } else {
          return this.router.createUrlTree(["/login"]);
        }
      })
    );
  }

  canMatch(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    const id = segments[0]?.path;

    if (this.uuidPattern.test(id)) {
      return true;
    } else {
      return this.router.createUrlTree(["/courses"]);
    }
  }
}
