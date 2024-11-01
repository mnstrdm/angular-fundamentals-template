import { Injectable } from "@angular/core";
import { createEffect, Actions, ofType } from "@ngrx/effects";
import * as AuthorsActions from "./authors.actions";
import { catchError, concatMap, map, mergeMap, of, withLatestFrom } from "rxjs";
import { CoursesService } from "@app/services/courses.service";
import { AuthorsStateFacade } from "./authors.facade";

@Injectable()
export class AuthorsEffects {
  constructor(
    private actions$: Actions,
    private coursesService: CoursesService,
    private authorsStateFacade: AuthorsStateFacade
  ) {}
  getAll$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.requestAllAuthors),

      mergeMap(() =>
        this.coursesService.getAllAuthors().pipe(
          map((authors) =>
            AuthorsActions.requestAllAuthorsSuccess({ authors })
          ),
          catchError((error) =>
            of(AuthorsActions.requestAllAuthorsFail({ error }))
          )
        )
      )
    )
  );

  createAuthor$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.requestCreateAuthor),
      mergeMap((action) =>
        this.coursesService.createAuthor(action.name).pipe(
          concatMap(() => [
            AuthorsActions.requestAllAuthors(),
            AuthorsActions.requestCreateAuthorSuccess(),
          ]),
          catchError((error) =>
            of(AuthorsActions.requestCreateAuthorFail({ error }))
          )
        )
      )
    )
  );

  getAuthorsNameById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthorsActions.requestAuthorsById),
      withLatestFrom(this.authorsStateFacade.allAuthors$),
      map(([action, authors]) => {
        const authorsIdList = action.authors;
        const authorsNamesList = authors
          .filter((author) => authorsIdList.includes(author.id))
          .map((filteredAuthor) => filteredAuthor.name);

        return AuthorsActions.requestAuthorsByIdSuccess({
          authors: authorsNamesList,
        });
      }),
      catchError((error) =>
        of(AuthorsActions.requestAuthorsByIdFail({ error }))
      )
    )
  );
}
