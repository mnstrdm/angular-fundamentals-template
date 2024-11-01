import { Injectable } from "@angular/core";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { map, Observable, take } from "rxjs";
import { UserStateFacade } from "@app/store/user/user.facade";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private userStateFacade: UserStateFacade
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userStateFacade.isAdmin$.pipe(
      take(1),
      map((isAdmin) => {
        return isAdmin ? true : this.router.createUrlTree(["/courses"]);
      })
    );
  }
}
