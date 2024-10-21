import { Injectable } from "@angular/core";
import { Course } from "@app/shared/models/course.model";
import { BehaviorSubject, catchError, forkJoin, map, Observable } from "rxjs";
import { CoursesService } from "./courses.service";
import { Author } from "@app/shared/models/author.model";

@Injectable({
  providedIn: "root",
})
export class CoursesStoreService {
  private courses$$: BehaviorSubject<Course[]> = new BehaviorSubject<Course[]>(
    []
  );
  private loading$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  private authors$$: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>(
    []
  );
  public courses$: Observable<Course[]> = this.courses$$.asObservable();
  public loading$: Observable<boolean> = this.loading$$.asObservable();
  public authors$: Observable<Author[]> = this.authors$$.asObservable();

  constructor(private coursesService: CoursesService) {}
  getAll(): void {
    this.loading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(
        catchError((error) => {
          this.loading$$.next(false);
          console.error("Error getting courses from server:", error);

          return [];
        })
      )
      .subscribe({
        next: (response) => {
          this.courses$$.next(response.result);
          this.loading$$.next(false);
        },
      });
  }

  createCourse(course: Course): void {
    this.loading$$.next(true);
    this.coursesService
      .createCourse(course)
      .pipe(
        catchError((error) => {
          this.loading$$.next(false);
          console.error("Error creating course:", error);
          return [];
        })
      )
      .subscribe({
        next: () => {
          this.getAll();
          this.loading$$.next(false);
        },
      });
  }

  getCourse(id: string): Observable<any> {
    return this.coursesService.getCourse(id);
  }

  editCourse(id: string, course: Course): void {
    this.loading$$.next(true);
    this.coursesService
      .editCourse(id, course)
      .pipe(
        catchError((error) => {
          this.loading$$.next(false);
          console.error("Error editing course:", error);

          return [];
        })
      )
      .subscribe({
        next: () => {
          this.getAll();
          this.loading$$.next(false);
        },
      });
  }

  deleteCourse(id: string): void {
    this.loading$$.next(true);
    this.coursesService
      .deleteCourse(id)
      .pipe(
        catchError((error) => {
          this.loading$$.next(false);
          console.error("Error deleting course:", error);

          return [];
        })
      )
      .subscribe({
        next: () => {
          this.getAll();
          this.loading$$.next(false);
        },
      });
  }

  filterCourses(value: string) {
    this.loading$$.next(true);
    if (value === "") {
      this.getAll();
    } else {
      const searchResult: any[] = [];
      forkJoin({
        titleResult: this.coursesService.filterCourses(`title=${value}`),
        descriptionResult: this.coursesService.filterCourses(
          `description=${value}`
        ),
        durationResult: this.coursesService.filterCourses(`duration=${value}`),
        craetionDateesult: this.coursesService.filterCourses(
          `creationDate=${value}`
        ),
      })
        .pipe(
          map((responses) => {
            searchResult.push(...responses.titleResult.result);
            searchResult.push(...responses.descriptionResult.result);
            searchResult.push(...responses.durationResult.result);
            searchResult.push(...responses.craetionDateesult.result);

            return searchResult.filter(
              (course, idx, self) =>
                idx === self.findIndex((c) => c.id === course.id)
            );
          }),
          catchError((error) => {
            this.loading$$.next(false);
            console.error("Error filtering course:", error);

            return [];
          })
        )
        .subscribe((finalResults) => {
          this.courses$$.next(finalResults);
          this.loading$$.next(false);
        });
    }
  }

  getAllAuthors(): void {
    this.loading$$.next(true);
    this.coursesService
      .getAllAuthors()
      .pipe(
        catchError((error) => {
          this.loading$$.next(false);
          console.error("Error getting authors from server:", error);

          return [];
        })
      )
      .subscribe({
        next: (response) => {
          this.authors$$.next(response.result);
          this.loading$$.next(false);
        },
      });
  }

  createAuthor(name: string): void {
    this.loading$$.next(true);
    this.coursesService
      .createAuthor(name)
      .pipe(
        catchError((error) => {
          this.loading$$.next(false);
          console.error("Error creating Author:", error);

          return [];
        })
      )
      .subscribe({
        next: () => {
          this.getAllAuthors();
          this.loading$$.next(false);
        },
      });
  }

  getAuthorById(id: string): Observable<any> {
    return this.coursesService.getAuthorById(id);
  }
}
