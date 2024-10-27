import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject, map } from "rxjs";
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

  constructor(
    private http: HttpClient,
    private sessionStorageService: SessionStorageService
  ) {
    this.isAuthorized$$ = new BehaviorSubject<boolean>(
      this.sessionStorageService.hasToken()
    );
    this.isAuthorized$ = this.isAuthorized$$.asObservable();
  }

  login(user: User): Observable<any> {
    return this.http.post<any>(this.getLoginUrl(), user).pipe(
      tap((response) => {
        if (response && response.result) {
          this.sessionStorageService.setToken(response.result);
          this.isAuthorized$$.next(true);
        }
      }),
      map((response) => response.result)
    );
  }

  logout(): Observable<any> {
    this.isAuthorized$$.next(false);
    return this.http.delete<any>(this.getLogoutUrl());
  }

  register(user: User): Observable<any> {
    return this.http.post<any>(this.getRegisterUrl(), user);
  }

  getLoginUrl(): string {
    return `${environment.serverApiUrl}/login`;
  }
  getRegisterUrl(): string {
    return `${environment.serverApiUrl}/register`;
  }
  getLogoutUrl(): string {
    return `${environment.serverApiUrl}/logout`;
  }

  getToken(): string | null {
    return this.sessionStorageService.getToken();
  }
  deleteToken(): void {
    this.sessionStorageService.deleteToken();
  }
}
