import { Injectable } from "@angular/core";
import * as AuthorsActions from "./authors.actions";
import * as AuthorsSelectors from "./authors.selectors";
import { AuthorsState } from "./authors.reducer";
import { select, Store } from "@ngrx/store";

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
  getAuthorsById(authors: string[]): void {
    this.store.dispatch(AuthorsActions.requestAuthorsById({ authors }));
  }
  createAuthor(name: string): void {
    this.store.dispatch(AuthorsActions.requestCreateAuthor({ name }));
  }
}
