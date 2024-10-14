import { Injectable } from "@angular/core";
import { Course, newCourse } from "@app/shared/models/course.model";
import { BehaviorSubject, catchError, Observable, tap } from "rxjs";
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
  getAll() {
    this.loading$$.next(true);
    this.coursesService
      .getAll()
      .pipe(
        tap((response) => {
          this.courses$$.next(response.result);
          this.loading$$.next(false);
        }),
        catchError((error) => {
          this.loading$$.next(false);
          console.error("Error getting courses from server:", error);

          return [];
        })
      )
      .subscribe();
  }

  createCourse(course: newCourse) {
    this.loading$$.next(true);
    this.coursesService
      .createCourse(course)
      .pipe(
        tap(() => {
          this.getAll();
          this.loading$$.next(false);
        }),
        catchError((error) => {
          this.loading$$.next(false);
          console.error("Error creating course:", error);

          return [];
        })
      )
      .subscribe();
  }

  getCourse(id: string): Observable<any> {
    return this.coursesService.getCourse(id);
  }

  editCourse(id: string, course: Course) {
    this.loading$$.next(true);
    this.coursesService
      .editCourse(id, course)
      .pipe(
        tap(() => {
          this.getAll();
          this.loading$$.next(false);
        }),
        catchError((error) => {
          this.loading$$.next(false);
          console.error("Error editing course:", error);

          return [];
        })
      )
      .subscribe();
  }

  deleteCourse(id: string) {
    this.loading$$.next(true);
    this.coursesService.deleteCourse(id).pipe(
      tap(() => {
        this.getAll();
        this.loading$$.next(false);
      }),
      catchError((error) => {
        this.loading$$.next(false);
        console.error("Error deleting course:", error);

        return [];
      })
    ).subscribe;
  }

  filterCourses(value: string) {
    // Add your code here
  }

  getAllAuthors() {
    this.loading$$.next(true);
    this.coursesService
      .getAllAuthors()
      .pipe(
        tap((response) => {
          this.authors$$.next(response.result);
          this.loading$$.next(false);
        }),
        catchError((error) => {
          this.loading$$.next(false);
          console.error("Error getting authors from server:", error);

          return [];
        })
      )
      .subscribe();
  }

  createAuthor(name: string) {
    this.loading$$.next(true);
    this.coursesService
      .createAuthor(name)
      .pipe(
        tap(() => {
          this.getAllAuthors();
          this.loading$$.next(false);
        }),
        catchError((error) => {
          this.loading$$.next(false);
          console.error("Error creating Author:", error);

          return [];
        })
      )
      .subscribe();
  }

  getAuthorById(id: string) {
    return this.coursesService.getAuthorById(id);
    /* let author: Author;
    this.loading$$.next(true);
    this.coursesService
      .getAuthorById(id)
      .pipe(
        tap(() => {
          this.loading$$.next(false);
        })
      )
      .subscribe({
        next: (response) => {
          author = response.result;
          return author;
        },
        error: (error) => {
          console.error("Error creating Author:", error);
        },
      }); */
  }
}
