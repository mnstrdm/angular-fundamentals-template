import { Injectable } from "@angular/core";
import { Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthorizedGuard {
  // Add your code here
  constructor(private authService: AuthService, private router: Router) {}

  canMatch(
    route: Route,
    segment: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.authService.isAuthorised) {
      return true;
    } else {
      return this.router.createUrlTree(["/login"]);
    }
  }
}
