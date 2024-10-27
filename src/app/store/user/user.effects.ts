import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { of } from "rxjs";
import { catchError, map, mergeMap } from "rxjs/operators";
import { Router } from "@angular/router";
import { UserService } from "@app/user/services/user.service";
import * as UserActions from "./user.actions";

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  getUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.requestUserData),
      mergeMap(() =>
        this.userService.getUser().pipe(
          map((user) => UserActions.requestUserDataSuccess({ user })),
          catchError((error) => of(UserActions.requestUserDataFail({ error })))
        )
      )
    )
  );
}
