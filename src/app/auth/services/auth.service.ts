import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { User } from "@app/shared/models/user.model";
import { tap } from "rxjs";

import { Router } from "@angular/router";
import { UserStoreService } from "@app/user/services/user-store.service";

const TOKEN = "SESSION_TOKEN";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$: BehaviorSubject<boolean>;
  public isAuthorized$: Observable<boolean>;

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private router: Router,
    private userStorageService: UserStoreService
  ) {
    this.isAuthorized$$ = new BehaviorSubject<boolean>(
      this.sessionStorageService.hasToken()
    );
    this.isAuthorized$ = this.isAuthorized$$.asObservable();
  }
  login(user: User): Observable<any> {
    // replace 'any' with the required interface
    // Add your code here

    return this.http.post<any>(this.getLoginUrl(), user).pipe(
      tap((response) => {
        if (response && response.result) {
          this.sessionStorageService.setToken(response.result);
          this.isAuthorized$$.next(true);

          this.router.navigate(["/courses"]);
        }
      })
    );
  }

  logout(): void {
    // Add your code here
    this.sessionStorageService.deleteToken();
    this.isAuthorized$$.next(false);
    this.router.navigate(["/login"]);
  }

  register(user: User): Observable<any> {
    // replace 'any' with the required interface
    // Add your code here
    return this.http.post<any>(this.getRegisterUrl(), user);
  }

  get isAuthorised() {
    // Add your code here. Get isAuthorized$$ value
    return this.isAuthorized$$.getValue();
  }

  set isAuthorised(value: boolean) {
    // Add your code here. Change isAuthorized$$ value
    this.isAuthorized$$.next(value);
  }

  getLoginUrl() {
    // Add your code here
    return "http://localhost:4000/login";
  }
  getRegisterUrl() {
    // Add your code here
    return "http://localhost:4000/register";
  }

  getToken() {
    return this.sessionStorageService.getToken();
  }
}
