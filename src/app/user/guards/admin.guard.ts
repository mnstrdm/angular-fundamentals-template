import { Injectable } from "@angular/core";
import { UserStoreService } from "../services/user-store.service";
import { Router, UrlTree } from "@angular/router";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminGuard {
  constructor(
    private userStorageService: UserStoreService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userStorageService.isAdmin$.pipe(
      map((isAdmin) => {
        if (isAdmin) {
          return true;
        } else {
          return this.router.createUrlTree(["/courses"]);
        }
      })
    );
  }
}
