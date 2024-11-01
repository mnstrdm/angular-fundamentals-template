import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ButtonLabels } from "@app/shared/constants/button-labels";
import { Location } from "@angular/common";
import { Course } from "@app/shared/models/course.model";
import {
  combineLatest,
  filter,
  map,
  Observable,
  Subscription,
  switchMap,
  take,
} from "rxjs";
import { CoursesStateFacade } from "@app/store/courses/courses.facade";
import { AuthorsStateFacade } from "@app/store/author/authors.facade";

@Component({
  selector: "app-course-info",
  templateUrl: "./course-info.component.html",
  styleUrls: ["./course-info.component.scss"],
})
export class CourseInfoComponent implements OnInit, OnDestroy {
  course$: Observable<Course | null> = this.coursesStateFacade.course$;
  btnTextBack: string = ButtonLabels.back;
  courseId: string | null = null;
  authorsByName: string[] = [];
  private subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private coursesStateFacade: CoursesStateFacade,
    private authorsStateFacade: AuthorsStateFacade
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get("id");

    if (courseId) {
      this.coursesStateFacade.getSingleCourse(courseId);
      const subscribeAuthorsByName = combineLatest([
        this.coursesStateFacade.isSingleCourseLoading$.pipe(
          filter((isLoading) => !isLoading),
          take(1)
        ),
        this.course$.pipe(
          filter((course) => course !== null && course !== undefined)
        ),
      ])
        .pipe(
          switchMap(([_, course]) => {
            return this.authorsStateFacade
              .getAuthorsById(course!.authors)
              .pipe(map((authors) => authors.map((author) => author.name)));
          })
        )
        .subscribe((authorsName) => (this.authorsByName = authorsName));

      this.subscriptions.push(subscribeAuthorsByName);
    }
  }

  onBack() {
    this.location.back();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach((subscrition) => {
      subscrition.unsubscribe();
    });
  }
}
