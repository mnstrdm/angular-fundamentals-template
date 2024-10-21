import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, BehaviorSubject } from "rxjs";
import { tap } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { User } from "@app/shared/models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthorized$$: BehaviorSubject<boolean>;
  public isAuthorized$: Observable<boolean>;
  /* private isAuthorized$$: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(this.sessionStorageService.hasToken());
  public isAuthorized$: Observable<boolean> =
    this.isAuthorized$$.asObservable(); */

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService,
    private router: Router
  ) {
    this.isAuthorized$$ = new BehaviorSubject<boolean>(
      this.sessionStorageService.hasToken()
    );
    this.isAuthorized$ = this.isAuthorized$$.asObservable();
  }
  login(user: User): Observable<any> {
    console.log("in the auth.service");
    return this.http.post<any>(this.getLoginUrl(), user).pipe(
      tap((response) => {
        if (response && response.result) {
          this.sessionStorageService.setToken(response.result);
          this.isAuthorized$$.next(true);
          console.log("Isauthorized$$: ", this.isAuthorized$$.getValue());

          this.isAuthorized$.subscribe((value) =>
            console.log("Isauthorized$: ", value)
          );
        }
      })
    );
  }

  logout(): void {
    this.sessionStorageService.deleteToken();
    this.isAuthorized$$.next(false);
    this.router.navigate(["/login"]);
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(this.getRegisterUrl(), user);
  }

  get isAuthorised() {
    return this.isAuthorized$$.getValue();
  }

  set isAuthorised(value: boolean) {
    this.isAuthorized$$.next(value);
  }

  getLoginUrl(): string {
    return `${environment.serverApiUrl}/login`;
  }
  getRegisterUrl(): string {
    return `${environment.serverApiUrl}/register`;
  }

  getToken(): string | null {
    return this.sessionStorageService.getToken();
  }
}
