import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { SessionStorageService } from "./session-storage.service";
import { User } from "@app/shared/models/user.model";
import { tap } from "rxjs";

const TOKEN = "SESSION_TOKEN";

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
    // replace 'any' with the required interface
    // Add your code here

    return this.http.post<any>("http://localhost:4000/login", user).pipe(
      tap((response) => {
        if (response && response.result) {
          this.sessionStorageService.setToken(response.result);
          this.isAuthorized$$.next(true);
        }
      })
    );
  }

  logout(): void {
    // Add your code here
  }

  register(user: any) {
    // replace 'any' with the required interface
    // Add your code here
  }

  get isAuthorised() {
    // Add your code here. Get isAuthorized$$ value
    return true;
  }

  set isAuthorised(value: boolean) {
    // Add your code here. Change isAuthorized$$ value
  }

  getLoginUrl() {
    // Add your code here
  }
}
