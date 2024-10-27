import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as UserActions from "./user.actions";
import * as UserSelectors from "./user.selectors";
import { UserState } from "./user.reducer";

@Injectable({
  providedIn: "root",
})
export class UserStateFacade {
  user$ = this.store.pipe(select(UserSelectors.getUserSelector));
  isAdmin$ = this.store.pipe(select(UserSelectors.isAdminSelector));
  isUserLoading$ = this.store.pipe(select(UserSelectors.isUserLoadingSelector));
  userErrorMessage$ = this.store.pipe(
    select(UserSelectors.getErrorMessageSelector)
  );

  constructor(private store: Store<UserState>) {}

  getUser(): void {
    this.store.dispatch(UserActions.requestUserData());
  }
}
