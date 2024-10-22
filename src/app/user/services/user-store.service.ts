import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, Observable, tap } from "rxjs";
import { UserService } from "./user.service";
import { User } from "@app/shared/models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserStoreService {
  private name$$ = new BehaviorSubject<string | null>(null);
  private isAdmin$$ = new BehaviorSubject<boolean>(false);

  private loggedInUser$$ = new BehaviorSubject<User>({
    email: "",
    password: "",
  });

  public loggedInUser$: Observable<User> = this.loggedInUser$$.asObservable();

  public name$: Observable<string | null> = this.name$$.asObservable();
  public isAdmin$: Observable<boolean> = this.isAdmin$$.asObservable();

  constructor(private userService: UserService) {}
  getUser() {
    this.userService
      .getUser()
      .pipe(
        catchError((error) => {
          console.error("Error getting user from server:", error);
          return [];
        })
      )
      .subscribe({
        next: (response) => {
          this.loggedInUser$$.next(response.result);
        },
      });
  }

  get isAdmin() {
    const loggedInUser = this.loggedInUser$$.getValue();
    return loggedInUser?.role === "admin";
  }

  set isAdmin(value: boolean) {
    this.isAdmin$$.next(value);
  }
}
