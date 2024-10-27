import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as AuthenticationActions from "./authentication.actions";
import { catchError, map, mergeMap, of, tap } from "rxjs";
import { AuthService } from "@app/auth/services/auth.service";
import { Router } from "@angular/router";

@Injectable()
export class AuthenticationEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.requestLogin),
      mergeMap((action) =>
        this.authService.login(action.credentials).pipe(
          map((result) =>
            AuthenticationActions.requestLoginSuccess({ result: result })
          ),
          catchError((error) =>
            of(AuthenticationActions.requestLoginFail({ error }))
          )
        )
      )
    )
  );
  registration$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.requestRegistration),
      mergeMap((action) =>
        this.authService.register(action.credentials).pipe(
          map(() => AuthenticationActions.requestRegistrationSuccess()),
          catchError((error) =>
            of(AuthenticationActions.requestRegistrationFail({ error }))
          )
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthenticationActions.requestLogout),
      mergeMap(() =>
        this.authService.logout().pipe(
          tap(() => this.authService.deleteToken()),
          map(() => AuthenticationActions.requestLogoutSuccess()),
          catchError((error) =>
            of(AuthenticationActions.requestLogoutFail({ error }))
          )
        )
      )
    )
  );

  redirectToTheLoginPage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthenticationActions.requestRegistrationSuccess,
          AuthenticationActions.requestLogoutSuccess
        ),
        map(() => {
          this.router.navigate(["/login"]);
        })
      ),
    { dispatch: false }
  );
}
