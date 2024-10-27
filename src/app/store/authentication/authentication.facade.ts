import { Injectable } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { AuthenticationState } from "./authentication.reducer";
import * as AuthenticationSelectors from "./authentication.selectors";
import * as AuthenticationActions from "./authentication.actions";
import { User } from "@app/shared/models/user.model";

@Injectable({
  providedIn: "root",
})
export class AuthenticationFacade {
  isLoginLoading$ = this.store.pipe(
    select(AuthenticationSelectors.isLoginLoadingSelector)
  );
  isAuthorized$ = this.store.pipe(
    select(AuthenticationSelectors.isAuthorizedSelector)
  );
  authenticationErrorMessage$ = this.store.pipe(
    select(AuthenticationSelectors.errorMessageSelector)
  );
  constructor(private store: Store<AuthenticationState>) {}

  login(credentials: User): void {
    this.store.dispatch(
      AuthenticationActions.requestLogin({ credentials: credentials })
    );
  }
  registration(credentials: User): void {
    this.store.dispatch(
      AuthenticationActions.requestRegistration({ credentials: credentials })
    );
  }
  logout(): void {
    this.store.dispatch(AuthenticationActions.requestLogout());
  }
}
