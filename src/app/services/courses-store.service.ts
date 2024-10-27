import { Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { Author } from "@app/shared/models/author.model";
import { AuthorsStateFacade } from "@app/store/author/authors.facade";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  constructor(private authorsStateFacade: AuthorsStateFacade) {}

  getAuthorsById(authorsIdList: string[]): Observable<Author[]> {
    return this.authorsStateFacade.allAuthors$.pipe(
      map((authors) =>
        authors.filter((author) => authorsIdList.includes(author.id))
      )
    );
  }
}
