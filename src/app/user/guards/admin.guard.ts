import { Injectable } from "@angular/core";
import { UserStoreService } from "../services/user-store.service";
import { CanActivate, Router, UrlTree } from "@angular/router";
import { map, Observable, of } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AdminGuard implements CanActivate {
  constructor(
    private userStorageService: UserStoreService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.userStorageService.isAdmin
      ? of(true)
      : of(this.router.createUrlTree(["/courses"]));
  }
}
