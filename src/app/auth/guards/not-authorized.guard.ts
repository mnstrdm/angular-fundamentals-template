import { Injectable } from "@angular/core";
import { Router, Route, UrlSegment, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: "root",
})
export class NotAuthorizedGuard {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: Route,
    segment: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.authService.isAuthorised) {
      return true;
    } else {
      return this.router.createUrlTree(["/courses"]);
    }
  }
}
