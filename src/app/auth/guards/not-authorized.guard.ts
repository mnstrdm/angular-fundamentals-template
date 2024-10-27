import { Injectable } from "@angular/core";
import { Router, UrlTree, CanActivate } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthenticationFacade } from "@app/store/authentication/authentication.facade";

@Injectable({
  providedIn: "root",
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationFacade: AuthenticationFacade
  ) {}

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authenticationFacade.isAuthorized$.pipe(
      take(1),
      map((isAuthorized) => {
        if (!isAuthorized) {
          return true;
        } else {
          return this.router.createUrlTree(["/courses"]);
        }
      })
    );
  }
}
