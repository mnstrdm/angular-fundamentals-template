import { Injectable } from "@angular/core";
import * as AuthorsActions from "./authors.actions";
import * as AuthorsSelectors from "./authors.selectors";
import { AuthorsState } from "./authors.reducer";
import { select, Store } from "@ngrx/store";
import { Author } from "@app/shared/models/author.model";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class AuthorsStateFacade {
  allAuthors$ = this.store.pipe(select(AuthorsSelectors.getAllAuthorsSelector));
  authorsName$ = this.store.pipe(
    select(AuthorsSelectors.getAuthorsNameSelector)
  );
  authorErrorMessage$ = this.store.pipe(
    select(AuthorsSelectors.getErrorMessageSelector)
  );
  isAllAuthorLoading$ = this.store.pipe(
    select(AuthorsSelectors.isAllAuthorsLoadingSelector)
  );
  isAuthorLoading$ = this.store.pipe(
    select(AuthorsSelectors.isAuthorLoadingSelector)
  );
  constructor(private store: Store<AuthorsState>) {}

  getAllAuthors(): void {
    this.store.dispatch(AuthorsActions.requestAllAuthors());
  }
  /* getAuthorsById(authors: string[]): void {
    this.store.dispatch(AuthorsActions.requestAuthorsById({ authors }));
  } */
  createAuthor(name: string): void {
    this.store.dispatch(AuthorsActions.requestCreateAuthor({ name }));
  }
  // we can use this if we want to get a list of authors by a list of author Id-s,
  // useing the allAuthors$ form our Authors Feature Store
  getAuthorsById(authorsIdList: string[]): Observable<Author[]> {
    return this.allAuthors$.pipe(
      map((authors) =>
        authors.filter((author) => authorsIdList.includes(author.id))
      )
    );
  }
}
