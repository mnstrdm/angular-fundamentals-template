import { Injectable } from "@angular/core";
import { Router, UrlTree, CanActivate } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class NotAuthorizedGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.authService.isAuthorized$.pipe(
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
